import { useEffect, useState } from 'react'
import { supabase } from './components/supabaseClient'
import Account from './components/account'
import { Session } from '@supabase/supabase-js'
import Signin from './components/signin'

function App() {
  const [session, setSession] = useState<Session|null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Signin /> : <Account key={session.user.id} session={session} />}
    </div>
  )

}

export default App
