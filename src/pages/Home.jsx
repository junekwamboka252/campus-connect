
function Home() {
  return (
    <main>
    
      <section>
          <h1>Welcome to Campus Connect</h1>
        <p>
          Discover campus events, connect with students,
          and explore communities around your campus.
        </p>

        <div>
          <button>Explore Events</button>
          <button>Discover Clubs</button>
        </div>
      </section>
     
      <section>
        <h2>Featured Events</h2>
         <p>Discover what's happening around your campus.</p>

        <div>
      
        </div>
      </section>

      <section>
        <h2>Explore Campus Clubs</h2>

        <p>Find communities that match your interests.</p>

        <div>
          {/* Club cards will go here */}
        </div>
      </section>

      
      <section>
        <h2>Have an Event to Share?</h2>

        <p>
          Create an event and let other students know
          what's happening on campus.
        </p>

        <button>Create an Event</button>
      </section>
    </main>
  )
}

export default Home
