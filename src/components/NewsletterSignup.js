import { useEffect } from 'react';
import classes from './NewsletterSignup.module.css';
import { useFetcher} from 'react-router-dom';


function NewsletterSignup() {
    const fetcher = useFetcher()
    //used to do an action "fetch" an action without triggering it

    const {data, state} = fetcher

    useEffect(()=> {
        if (state === 'idle' && data && data.message){
            window.alert(data.message)
        }
    },[data, state])
    
  return (
    //Capital F triggers action from route, but the issue is that this component is used in main navigation, so that would be a lot of redundant code, instead we use fetcher which has its own form, which will trigger the action still but not initialize. So it will trigger, without navigating. So in the example if we signup it will not navigate us to the signup page automatically
    <fetcher.Form method="post" className={classes.newsletter} action="/newsletter">
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;