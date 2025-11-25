import { showSuccessMsg,showErrorMsg } from "../services/event-bus.service.js"


import { removeTodo} from "../store/todo.actions.js"





const { useParams , Link , useNavigate} = ReactRouterDOM

 

export function TodoRemoveModal() {

    const { todoId } = useParams()

    const navigate = useNavigate()

 

    function onRemoveTodo() {

        removeTodo(todoId)

            .then(() => showSuccessMsg('Todo removed'))

            .catch(err => {

                console.error('err:', err)

                showErrorMsg('Cannot remove todo')

            })

            .finally(() => navigate('/todo'))

    }

 

    return (

        <section className="todo-remove-modal">

            <div className="modal-content">

                <h2>Confirm Deletion</h2>

                <p>Are you sure you want to remove this todo?</p>

                <div className="modal-actions">

                    <button className="btn btn-danger" onClick={onRemoveTodo}>Confirm</button>

                    <Link to="/todo" className="btn btn-secondary">Cancel</Link>

                </div>

            </div>

        </section>

    )

}

 