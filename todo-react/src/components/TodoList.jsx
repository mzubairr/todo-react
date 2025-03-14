import "./TodoList.css";
import "../Media.css";

function TodoList({ todoArray, editTodo, deleteTodo, toggleComplete }) {
  return (
    <div>
      {todoArray.length > 0 ? (
        todoArray.map((val, index) => {
          return (
            <div className="taskQue todoTask" key={val.id}>
              <div className="task">
                <div>
                  <input
                    type="checkbox"
                    id="check"
                    checked={val.isCompleted}
                    onChange={() => toggleComplete(val.id)}
                  />
                </div>
                <div className="title-Desc">
                  <p
                    className={`taskPara title ${
                      val.isCompleted ? "line" : ""
                    }`}
                  >
                    {val.title}
                  </p>
                  <p
                    className={`taskPara description ${
                      val.isCompleted ? "line" : ""
                    }`}
                  >
                    {val.description}
                  </p>
                </div>
              </div>
              <div className="icons">
                <span className="editIcon" onClick={() => editTodo(index)}>
                  <i className="fa-solid fa-pencil"></i>
                </span>
                <span className="deleteIcon" onClick={() => deleteTodo(index)}>
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="noTodo">No todo Found.</h1>
      )}
    </div>
  );
}

export default TodoList;
