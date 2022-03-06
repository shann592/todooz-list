const addForm = document.querySelector('.add');
const list = document.querySelector('.list-group');
const search = document.querySelector('.search input');

const generateTemplate = todo => {
    const html = `<li class="list-group-item d-flex justify-content-between align-items-center">
                     <span>${todo}</span>
                     <i class="far fa-trash-alt delete"></i>
                  </li>`
                  
    list.innerHTML += html;
};

addForm.addEventListener('submit', e => {

    e.preventDefault();
    const todo = addForm.add.value.trim();

    if(todo.length){
        if(!localStorage.getItem('todos_json')) {
            const todoArr = [{todoName: todo}];
            localStorage.setItem('todos_json', JSON.stringify(todoArr));
        } else {
            const temp = {todoName: todo};
            const todoArr = JSON.parse(localStorage.getItem('todos_json'));
            todoArr.push(temp);
            localStorage.setItem('todos_json', JSON.stringify(todoArr));
        }
        generateTemplate(todo);
        addForm.reset();
    }
});


list.addEventListener('click', e => {

    if(e.target.classList.contains('delete')){
        let todoArr = JSON.parse(localStorage.getItem('todos_json'));
        const removedTodo = e.target.parentElement.textContent.trim();

        todoArr = todoArr.filter((val) => {
            return val.todoName !== removedTodo;
        });
        localStorage.setItem('todos_json',JSON.stringify(todoArr));
        e.target.parentElement.remove();
    }
});

const filterTodos = term => {

    // add filtered class
    Array.from(list.children)
      .filter(todo => !todo.textContent.toLowerCase().includes(term))
      .forEach(todo => todo.classList.add('filtered'));
  
    // remove filtered class
    Array.from(list.children)
      .filter(todo => todo.textContent.toLowerCase().includes(term))
      .forEach(todo => todo.classList.remove('filtered'));
  
  };  

  search.addEventListener('keyup', () => {

    const term = search.value.trim().toLowerCase();
    filterTodos(term);
  
  });

  if(localStorage.getItem('todos_json')) {
      const todoArr = JSON.parse(localStorage.getItem('todos_json'));
      todoArr.forEach(item => generateTemplate(item.todoName));
  }

