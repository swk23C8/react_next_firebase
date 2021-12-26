/* eslint-disable @next/next/no-img-element */
import { auth, firestore, googleAuthProvider } from '../lib/firebase'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useContext, useState, useEffect, useCallback } from 'react'
import { UserContext } from '../lib/context'
import debounce from 'lodash.debounce'

export default function EnterPage({ }) {

  const { user, username } = useContext(UserContext)

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
        { 
          user ?
            !username ? <UsernameForm /> : <SignOutButton />
            :
            <SignInButton />
        }
    </main>
  )
}

function SignInButton() {

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error) {
      console.log('Error creating user', error.message);
      toast.error('Error creating user')
    }
  }

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <Image src={'/google_logo.svg'} alt="Google Logo" width={30} height={30} />
      Sign In
    </button>
  )
}


function SignOutButton() {

  const signOut = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.log('Error during sign out', error.message);
      toast.error('Error during sign out')
    }
  }

  return(
    <button onClick={signOut}>
      Sign Out
    </button>
  )
}

function UsernameForm() {

  const { user, username } = useContext(UserContext)

  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => {
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    if (val.length < 3) {
      setFormValue(val)
      setLoading(false)
      setIsValid(false)
    }
    
    if (re.test(val)) {
      setFormValue(val)
      setLoading(true)
      setIsValid(false)
    }

  }

  useEffect(() => {
    checkUsername(formValue)
  }, [checkUsername, formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.collection('usernames').doc(username)
        const { exists } = await ref.get()
        setIsValid(!exists)
        setLoading(false)
      }
    }, 500),
    []
  )

  const onSubmit = async (e) => {
    e.preventDefault()

    const userDoc = firestore.collection('users').doc(user.uid)
    const usernameDoc = firestore.collection('usernames').doc(formValue)

    //Commit both docs together as a batch write
    const batch = firestore.batch()
    batch.set(userDoc, {username: formValue, photoURL: user.photoURL, displayName: user.displayName})
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  }

  return(
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input type="text" name="username" placeholder="username" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button type="submit" className="btn-green" disabled={!isValid}>Create Username</button>

          <h3>Debug State</h3>
          
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Usernsame Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  )
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}