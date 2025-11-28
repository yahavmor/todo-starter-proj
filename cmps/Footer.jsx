const { useSelector } = ReactRedux

export function Footer() {
  const loggedInUser = useSelector((storeState) => storeState.loggedInUser)
  const todos = useSelector((storeState) => storeState.todos)

  const doneTodos = todos.filter(todo => todo.isDone).length
  const progressPercentage = Math.round((doneTodos / todos.length) * 100)


  return (
    <footer className="footer"         
        style={{    
        color: (loggedInUser && loggedInUser.userPrefs && loggedInUser.userPrefs['txt-colour']) || '#fff',
        backgroundColor: (loggedInUser && loggedInUser.userPrefs && loggedInUser.userPrefs['bgc-colour']) || '#000'
        }}>
      <p>© 2025 Pink Panther. All rights reserved.</p>
      {loggedInUser ? (
        <section>
            <div className="progress-percentage">
            You have completed {progressPercentage}% of your todos
          </div>
          <p>Logged in as: {loggedInUser.fullname}</p>
        </section>
      ) : (
        <p>Please log in to access more features.</p>
      )}
    </footer>
  )
}
