import { DSAuthProvider } from './auth/ds-auth-provider'
import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'

// const redirect_url = 'exp://7mn5d78.jason-e-cruz.19000.exp.direct:80/';
const redirect_url = 'http://localhost:3000';
  
export function Provider({ children }: { children: React.ReactNode }) {
  return (
      <DSAuthProvider app_id='tv-s-sejutakgdatapassport' redirect_url={redirect_url}>
        <SafeArea>
          <NavigationProvider>{children}</NavigationProvider>
        </SafeArea>
      </DSAuthProvider>
      
  )
}
