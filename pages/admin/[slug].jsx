import styles from '../../styles/Admin.module.css';
import { firestore, serverTimestamp } from '../../lib/firebase';
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useForm, useFormState } from 'react-hook-form'
import toast from 'react-hot-toast'
import AuthCheck from '../../components/AuthCheck'
import ReactMarkdown from 'react-markdown'
import { UserContext } from '../../lib/context';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import Link from 'next/link'
import ImageUploader from '../../components/ImageUploader';

export default function AdminPostEdit() {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  )
}

function PostManager() {
  const [preview, setPreview] = useState(false)
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { slug } = router.query

  const postRef = firestore.collection('users').doc(user?.uid).collection('posts').doc(slug)
  const [post] = useDocumentDataOnce(postRef)

  const deletePost = async () => {
    try {
      await postRef.delete()
    } catch (error) {
      console.log('Error during sign out', error.message);
      toast.error('Error while deleting post')
    }

    toast.success('Post deleted')
    router.push('/admin')
    
  }

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm postRef={postRef} postValues={post} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`} passHref>
              <button className="btn-brown">Live view</button>
            </Link>
            <button className="btn-red" onClick={deletePost}>Delete</button>
          </aside>
        </>
      )}
    </main>
  )
}

function PostForm({ postValues, postRef, preview }) {
  const { register, handleSubmit, reset, watch, formState: { errors }, control } = useForm({ defaultValues: postValues, mode: 'onChange' });

  const { isValid, isDirty } = useFormState({
    control
  })

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });

    reset({ content, published });

    toast.success('Post updated successfully!')
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div className={preview ? styles.hidden : styles.controls}>

      <ImageUploader />
  
      <textarea name="content" {...register('content',
          {
            required: "content is required",
            maxLength: {value: 20000, message: 'Content is too long'},
            minLength: {value: 10, message: 'Content is too short'}
          },
        )}></textarea>

        <fieldset>
          <input 
            className={styles.checkbox} 
            name="published" 
            type="checkbox" 
            {...register('published')} />
          <label>Published</label>
        </fieldset>
        
        {errors.content && <p className="text-danger">{ errors.content.message }</p>}

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  );
}