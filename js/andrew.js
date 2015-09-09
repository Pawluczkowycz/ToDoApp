(function() {

// Main Page
  var todo = {
    counterVariable: 0,
    init: function() {
      // Set Todo list variable
      this.todoList = JSON.parse(localStorage.getItem('todos'));
      this.cacheDom();
      this.bindEvents();
      this.render();
      todoClear.init();
      todoEdit.init();
    },
    cacheDom: function() {
      this.$el = $('#home');
      this.$addButton = this.$el.find('#add-button');
      this.$clearButton = this.$el.find('#clear-button');
      this.$todosList = this.$el.find('#todos');
    },
    bindEvents: function() {
      this.$addButton.on('click', todoAdd.init);
    },
    render: function() {
      if (localStorage.getItem('todos') !== null) {
         // Loop through and output list items
        
        $.each(this.todoList, function(key, value) {
          todo.$todosList.prepend('<li id="task-'+ todo.counterVariable+'"><a id="todo_link" href="#edit" data-todo_name ="'+value.todo_name+'" data-todo_date="'+value.todo_date+'">'+value.todo_name+'<span>'+value.todo_date+'</span></a></li>');
          todo.counterVariable++;
        });
      
      this.refresh();
      this.addToCache();
      }      
    },
    // jQuery Mobile Listview Refresh
    refresh: function() {
      this.$todosList.listview('refresh');
    },
    addToCache: function() {
      this.$todosListItem = this.$todosList.find('li');
      // Bind Added Todo Item
      this.$todosListItem.on('click', todoEdit.current);
    }
  };

// Add Page
  var todoAdd = {
    init: function() {
      todoAdd.cacheDom();
      todoAdd.bindEvents();
    },
    cacheDom: function() {
      this.$el = $('#add');
      this.$cancelBtn = this.$el.find('#cancel-btn');
      this.$saveBtn = this.$el.find('#add-btn');
      this.$todoName = this.$el.find('#todo_name');
      this.$todoDate = this.$el.find('#todo_date');
    },
    bindEvents: function() {
      this.$saveBtn.on('click', this.submit.bind(this));
      this.$todoName.on('keypress', this.keypress);
    },
    render: function(todo_name, todo_date) {
      todo.$todosList.prepend('<li id="task-'+ todo.counterVariable+'"><a class="todo_link" href="#edit" data-todo_name ="'+todo_name+'" data-todo_date="'+todo_date+'">'+todo_name+'<span>'+todo_date+'</span></a></li>');
      todo.counterVariable++;
      
      todo.refresh();
      todo.addToCache();
    },
    keypress: function(e) {
      if(e.which == 13) {
        e.preventDefault();
        console.log('keypress function');
        todoAdd.submit();
        window.location =
        "file:///C:/Users/Andrew/Desktop/Projects/ToDo%20Udemy%20App/index.html";
      }       
    },
    submit: function() {
      var todo_name = this.$todoName.val();
      var todo_date = this.$todoDate.val();
      
      // Simple field validation
      if (todo_name == '') {
        alert('Please give the todo a name');
      } else if (todo_date == '') {
        alert('Please add a date');
      } else {
        var todos = JSON.parse(localStorage.getItem('todos'));  
      
        // Check todos
        if (todos == null) {
          todos = [];
        }
        // Add new todo to array
        var new_todo = {
          "todo_name": todo_name,
          "todo_date": todo_date
        }
        todos.push(new_todo);
        localStorage.setItem('todos',JSON.stringify(todos));

        this.clear();
        this.render(todo_name, todo_date);
      }
      
    },
    clear: function() {
      this.$todoName.val('');
      this.$todoDate.val('');
    }
  };

// Clear All Todos  
  var todoClear = {
    init: function() {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function() {

    },
    bindEvents: function() {
      todo.$clearButton.on('click', this.clearTodos);
    },
    clearTodos: function() { 
      localStorage.clear();
      window.location =
        "file:///C:/Users/Andrew/Desktop/Projects/ToDo%20Udemy%20App/index.html";
    }
  };

// Edit Page
  var todoEdit = {
    init: function() {
      this.cacheDom();
      this.bindEvents();
    },
    cacheDom: function() {
      this.$el = $('#edit');
      this.$editBtn = this.$el.find("#save-btn");
      this.$editName = this.$el.find('#todo_name_edit');
      this.$editDate = this.$el.find('#todo_date_edit');
      this.$editDelete = this.$el.find('#delete');
    },
    bindEvents: function() {
      this.$editBtn.on('click', this.capture.bind(this));
      this.$editDelete.on('click', this.clearCurrentTodo.bind(this));
      this.$editName.on('keypress', function(e) {

        if(e.which == 13) {
          todoEdit.capture();
          e.preventDefault();
          window.location =
        "file:///C:/Users/Andrew/Desktop/Projects/ToDo%20Udemy%20App/index.html";
        }
      });
    },
    capture: function() {
      console.log('todoEdit.capture fired');
      this.editedName = this.$editName.val(),
      this.editedDate = this.$editDate.val();
      
      for (var i = 0; i < todoEdit.todoStorage.length; i++) {
        if (this.todoStorage[i].todo_name == this.currentName) {
          this.todoStorage[i].todo_name = this.editedName;
          this.todoStorage[i].todo_date = this.editedDate;
          
          localStorage.setItem('todos', JSON.stringify(todoEdit.todoStorage));
          window.location =
        "file:///C:/Users/Andrew/Desktop/Projects/ToDo%20Udemy%20App/index.html";
        }
      }
    },
    current: function() {
      console.log('todoEdit.current fired');
      
      todoEdit.currentName = $(this).find('a').data('todo_name'),
      todoEdit.currentDate = $(this).find('a').data('todo_date');
      
      todoEdit.$editName.val(todoEdit.currentName);
      todoEdit.$editDate.val(todoEdit.currentDate);
      
      todoEdit.todoStorage = JSON.parse(localStorage.getItem('todos'));
    },
    clearCurrentTodo: function() {
      todoEdit.currentName = todoEdit.$editName.val();
      todoEdit.currentDate = todoEdit.$editDate.val();
      
      for (var i = 0; i < todoEdit.todoStorage.length; i++) {
        if (this.todoStorage[i].todo_name == this.currentName) {
            todoEdit.todoStorage.splice(i,1);
          
          localStorage.setItem('todos', JSON.stringify(todoEdit.todoStorage));
          window.location =
        "file:///C:/Users/Andrew/Desktop/Projects/ToDo%20Udemy%20App/index.html";
        }
      }
    }
  };
  
// DOM is ready
  $(function() {
    todo.init();
  });
  
})();