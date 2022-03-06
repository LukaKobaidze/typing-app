import Header from 'components/Header/Header';
import Typing from 'components/Typing/Typing';

const sentence =
  "I don't know if I will have the time to write any more letters, because I might be too busy trying to participate. So, if this does end up being the last letter, I just want you to know that I was in a bad place before I started high school, and you helped me. Even if you didn’t know what I was talking about, or know someone who’s gone through it, you made me not feel alone. Because I know there are people who say all these things don’t happen. And there are people who forget what it’s like to be sixteen when they turn seventeen. I know these will all be stories some day, and our pictures will become old photographs. We all become somebody’s mom or dad. But right now, these moments are not stories. This is happening. I am here, and I am looking at her. And she is so beautiful. I can see it. This one moment when you know you’re not a sad story. You are alive. And you stand up and see the lights on the buildings and everything that makes you wonder. And you’re listening to that song, and that drive with the people who you love most in this world. And in this moment, I swear, we are infinite.";

function App() {
  return (
    <>
      <Header />
      <main>
        <Typing sentence={sentence} />
      </main>
    </>
  );
}

export default App;
