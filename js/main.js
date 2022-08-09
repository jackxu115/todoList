const eleBody = document.body

const tags = {
    eleProjectList: document.createElement('div'),
    eleContentHeading: document.createElement('h2'),
    eleTaskList: document.createElement('div'),
    eleAddProject: document.createElement('div'),
    eleProject: document.createElement('div'),
    eleNewProject: null
}

const data = {
    projectName: null,
    projectId: 1,
    taskTitle: null,
    taskDes: null,
    taskDueDate: null,
    taskPriority: 'Medium',
    taskId: 0,
    currentProjectId: 0,
    currentTaskId: 0
}

let projectList = []

// create new project object
const project = (name, id) => {
    const tasks = []
    return {name, id, tasks}
}

// create new task object
const task = (title, des, dueDate, priority, taskId) => {
    let status = 'open'
    return {title, des, dueDate, priority, taskId, status}
}

// save data into localstorage
const saveProject = data => {
    let dataString = JSON.stringify(data)
    localStorage.setItem('saveProject', dataString)
}

// get data from localstorage
const getData = () => {
    if (localStorage.getItem('saveProject') === null) {
        console.log('no localstorage data')
        const Project = project('Todos', 0)
        projectList.push(Project)
        saveProject(projectList)
        localStorage.setItem('projectId', '1')
        localStorage.setItem('taskId', '0')
    } else {
        console.log('has localstorage data')
        let dataArray = localStorage.getItem('saveProject')
        let dataProjectId = localStorage.getItem('projectId')
        let dataTaskId = localStorage.getItem('taskId')
        projectList = JSON.parse(dataArray)
        data.projectId = parseInt(dataProjectId)
        data.taskId = parseInt(dataTaskId)
        displayProjects(projectList)
        cbTodoList(projectList[0])
        console.log(projectList)
        console.log(typeof data.projectId)
        console.log(typeof data.taskId)
    }
}

// new project form ask user to create new project
const newProject = () => {
    const eleNewProject = document.createElement('div')
    const eleInput = document.createElement('input')
    const addBtn = document.createElement('button')
    const cancelBtn = document.createElement('button')

    eleNewProject.classList.add('newProject')
    eleInput.classList.add('newProjectInput')
    addBtn.classList.add('newProjectAddBtn')
    cancelBtn.classList.add('newProjectCancelBtn')

    addBtn.textContent = 'Add'
    cancelBtn.textContent = 'Cancel'

    eleInput.addEventListener('input', cbInputProject)
    addBtn.addEventListener('click', cbAddProject)
    cancelBtn.addEventListener('click', cbCancelProject)

    eleNewProject.appendChild(eleInput)
    eleNewProject.appendChild(addBtn)
    eleNewProject.appendChild(cancelBtn)
    tags.eleNewProject = eleNewProject

    return eleNewProject

}

// call back function get project name via user input
const cbInputProject = event => {
    data.projectName = event.target.value
}

// call back function when user click add button to create new project
const cbAddProject = event => {
    if (data.projectName === null) {
        const input = document.querySelector('.newProjectInput')
        input.setAttribute('style', 'border: 2px red solid')
    } else {
        const Project = project(data.projectName, data.projectId)
        projectList.push(Project)
        console.log(projectList)

        const newProject = createNewProject(data.projectName, data.projectId)
        tags.eleProjectList.appendChild(newProject)

        tags.eleProject.appendChild(tags.eleAddProject)
        tags.eleProject.removeChild(tags.eleNewProject)
        data.projectName = null
        data.projectId++
        saveProject(projectList)
        localStorage.setItem('projectId', `${data.projectId}`)
    }
}

// call back function when user click cancel button to discard new project creation
const cbCancelProject = event => {
    console.log('cancel new project')
    tags.eleProject.appendChild(tags.eleAddProject)
    tags.eleProject.removeChild(tags.eleNewProject)
}

// call back function when user click add project button from project navbar
const cbCreateProject = event => {
    console.log('add project')
    tags.eleProject.appendChild(newProject())
    tags.eleProject.removeChild(tags.eleAddProject)
    // tags.eleAddProject.setAttribute('style', 'visibility: hidden')
}

// call back function when user click delete project button from project navbar
const cbDeleteProject = event => {
    const index = parseInt(event.target.id.substring(3))
    projectList = projectList.filter(element => element.id !== index)
    const deleteProjectId = `projectItem${index}`
    const deleteProject = document.querySelector(`#${deleteProjectId}`)
    tags.eleProjectList.removeChild(deleteProject)
    console.log(projectList)
}

// call back function to get task name via user input
const cbTaskTitle = event => {
    data.taskTitle = event.target.value
}

// call back function to get task description via user input
const cbTaskDes = event => {
    data.taskDes = event.target.value
}

// call back function to get task due date via user input
const cbTaskDueDate = event => {
    data.taskDueDate = event.target.value
}

// call back function to get task priority via user input
const cbTaskPriority = event => {
    data.taskPriority = event.target.value
}

// call back function to creat a task when user click add button
const cbAddTask = event => {
    if (data.taskTitle === null) {
        const taskTitle = document.querySelector('.taskFormTitleInput')
        taskTitle.setAttribute('style', 'border: 2px red solid')
    } else if (data.taskDueDate === null) {
        const taskDueDate = document.querySelector('.taskFormDueDateInput')
        taskDueDate.setAttribute('style', 'border: 2px red solid')
    } else {
        const Task = task(data.taskTitle, data.taskDes, data.taskDueDate, data.taskPriority, data.taskId)
        console.log(Task)
        projectList.forEach(element => {
            if (element.id === data.currentProjectId) {
                element.tasks.push(Task)
            }
        })

        const newTask = createNewTask(data.taskTitle, data.taskDueDate, data.taskId, data.taskPriority)
        tags.eleTaskList.appendChild(newTask)

        data.taskTitle = null
        data.taskDes = null
        data.taskDueDate = null
        data.taskPriority = 'Medium'
        data.taskId++
        saveProject(projectList)
        localStorage.setItem('taskId', `${data.taskId}`)
        const taskForm = document.querySelector('.taskForm')
        tags.eleTaskList.removeChild(taskForm)
    }
    console.log('projectList', projectList)
}

// call back function to cancel task creation when user click cancel button
const cbCancelTask = event => {
    const taskForm = document.querySelector('.taskForm')
    tags.eleTaskList.removeChild(taskForm)
}

// call back function when user click add button to start create a new task
const cbCreateTask = event => {
    // event.target.dataset.projectId = data.currentProjectId

    const eleTaskInfo = document.createElement('div')
    const eleTitleLabel = document.createElement('label')
    const eleTitleInput = document.createElement('input')
    const eleDesLabel = document.createElement('label')
    const eleDesInput = document.createElement('input')
    const eleDueDateLabel = document.createElement('label')
    const eleDueDateInput = document.createElement('input')
    const elePriorityLabel = document.createElement('label')
    const elePrioritySelection = document.createElement('select')
    const eleHigh = document.createElement('option')
    const eleMed = document.createElement('option')
    const eleLow = document.createElement('option')
    const eleAddBtn = document.createElement('button')
    const eleCancelBtn = document.createElement('button')

    eleTaskInfo.classList.add('taskForm')
    eleTitleLabel.classList.add('taskFormTitleLabel')
    eleTitleInput.classList.add('taskFormTitleInput')
    eleDesLabel.classList.add('taskFormDesLabel')
    eleDesInput.classList.add('taskFormDesInput')
    eleDueDateLabel.classList.add('taskFormDueDateLabel')
    eleDueDateInput.classList.add('taskFormDueDateInput')
    elePriorityLabel.classList.add('taskFormPriorityLabel')
    elePrioritySelection.classList.add('taskFormPrioritySelection')
    eleHigh.classList.add('taskFormOptionHigh')
    eleMed.classList.add('taskFormOptionMedium')
    eleLow.classList.add('taskFormOptionLow')
    eleAddBtn.classList.add('taskFormAddBtn')
    eleCancelBtn.classList.add('taskFormCancelBtn')

    eleTitleLabel.textContent = 'Name'
    eleDesLabel.textContent = 'Description'
    eleDueDateLabel.textContent = 'Due Date'
    elePriorityLabel.textContent = 'Priority'
    eleHigh.textContent = 'High'
    eleMed.textContent = 'Medium'
    eleLow.textContent = 'Low'
    eleAddBtn.textContent = 'Add'
    eleCancelBtn.textContent = 'Cancel'

    eleDueDateInput.setAttribute('type', 'date')

    eleTitleInput.addEventListener('input', cbTaskTitle)
    eleDesInput.addEventListener('input', cbTaskDes)
    eleDueDateInput.addEventListener('input', cbTaskDueDate)
    elePrioritySelection.addEventListener('change', cbTaskPriority)
    eleAddBtn.addEventListener('click', cbAddTask)
    eleCancelBtn.addEventListener('click', cbCancelTask)

    eleTaskInfo.appendChild(eleTitleLabel)
    eleTaskInfo.appendChild(eleTitleInput)
    eleTaskInfo.appendChild(eleDesLabel)
    eleTaskInfo.appendChild(eleDesInput)
    eleTaskInfo.appendChild(eleDueDateLabel)
    eleTaskInfo.appendChild(eleDueDateInput)
    eleTaskInfo.appendChild(elePriorityLabel)
    elePrioritySelection.appendChild(eleHigh)
    elePrioritySelection.appendChild(eleMed)
    elePrioritySelection.appendChild(eleLow)
    eleTaskInfo.appendChild(elePrioritySelection)
    eleTaskInfo.appendChild(eleAddBtn)
    eleTaskInfo.appendChild(eleCancelBtn)

    elePrioritySelection.selectedIndex = 1

    tags.eleTaskList.appendChild(eleTaskInfo)
    // console.log(event.target.dataset)
}

// call back function to display tasks under the project when click on the task item
const cbShowProject = event => {
    data.currentProjectId = parseInt(event.target.id.substring(11))
    const found = projectList.find(element => element.id === data.currentProjectId)
    console.log('show project', data.currentProjectId)
    console.log('found project', found)
    displayProjectContent(found)
}

// call back function to display the tasks under the todolist when user click on the todos item
const cbTodoList = event => {
    data.currentProjectId = 0
    displayProjectContent(projectList[0])
}

// call back function to delete the task when user click the del button on the task
const cbDeleteTask = event => {
    const index = parseInt(event.target.id.substring(3))
    console.log('delete', index)
    projectList.forEach(project => {
        if (project.id === data.currentProjectId) {
            project.tasks = project.tasks.filter(task => task.taskId !== index)
        }
    })
    const deleteTaskId = event.target.parentNode.id
    const deleteTask = document.querySelector(`#${deleteTaskId}`)
    tags.eleTaskList.removeChild(deleteTask)
}

// call back function to start edit the task when user click on the task's name
const cbEditTask = event => {
    console.log('edit', event.target.parentNode)
    cbCreateTask()
    data.currentTaskId = parseInt(event.target.parentNode.id.substring(4))
    const foundProject = projectList.find(project => project.id === data.currentProjectId)
    const foundTask = foundProject.tasks.find(task => task.taskId === data.currentTaskId)
    console.log('found task', foundTask)
    data.taskTitle = foundTask.title
    data.taskDes = foundTask.des
    data.taskDueDate = foundTask.dueDate
    data.taskPriority = foundTask.priority
    displayTaskContent(foundTask)
}

// call back function to confirm change the task content when user click on the change button
const cbChangeTask = event => {
    console.log('change', event.target)
    console.log('task info', data.taskTitle, data.taskDes, data.taskDueDate, data.taskPriority, data.currentTaskId)

    if (data.taskTitle === "") {
        const taskTitle = document.querySelector('.taskFormTitleInput')
        taskTitle.setAttribute('style', 'border: 2px red solid')
    } else if (data.taskDueDate === "") {
        const taskDueDate = document.querySelector('.taskFormDueDateInput')
        taskDueDate.setAttribute('style', 'border: 2px red solid')
    } else {
        projectList.forEach(project => {
            if (project.id === data.currentProjectId) {
                project.tasks.forEach(task => {
                    if (task.taskId === data.currentTaskId) {
                        task.title = data.taskTitle
                        task.des = data.taskDes
                        task.dueDate = data.taskDueDate
                        task.priority = data.taskPriority
                    }
                })
            }
        })

        saveProject(projectList)

        const eleTaskTitle = document.querySelector(`#taskItemTitle${data.currentTaskId}`)
        const eleTaskDueDate = document.querySelector(`#taskItemDueDate${data.currentTaskId}`)
        const elePriority = document.querySelector(`#taskItemPriority${data.currentTaskId}`)

        eleTaskTitle.textContent = data.taskTitle
        eleTaskDueDate.textContent = data.taskDueDate
        elePriority.textContent = data.taskPriority

        data.taskTitle = null
        data.taskDes = null
        data.taskDueDate = null
        data.taskPriority = 'Medium'
        const taskForm = document.querySelector('.taskForm')
        tags.eleTaskList.removeChild(taskForm)
    }

    console.log('after change task', projectList)
}

// display the task content in the task form
const displayTaskContent = taskObj => {
    const eleTaskTitle = document.querySelector('.taskFormTitleInput')
    const eleTaskDes = document.querySelector('.taskFormDesInput')
    const eleTaskDueDate = document.querySelector('.taskFormDueDateInput')
    const eleTaskPriority = document.querySelector('.taskFormPrioritySelection')
    const eleChangeBtn = document.querySelector('.taskFormAddBtn')

    debugger
    eleTaskTitle.value = taskObj.title
    eleTaskDes.value = (taskObj.des === null) ? "" : taskObj.des
    eleTaskDueDate.value = taskObj.dueDate

    eleTaskPriority.value = taskObj.priority
    eleChangeBtn.textContent = 'Change'
    eleChangeBtn.removeEventListener('click', cbAddTask)
    eleChangeBtn.addEventListener('click', cbChangeTask)
}

// display the project content include a task list
const displayProjectContent = projectObj => {
    tags.eleContentHeading.textContent = projectObj.name
    tags.eleTaskList.replaceChildren()

    if (projectObj.tasks.length > 0) {
        projectObj.tasks.forEach(element => {
            console.log(element)
            const Task = createNewTask(element.title, element.dueDate, element.taskId, element.priority)
            console.log('Task', Task)
            tags.eleTaskList.appendChild(Task)
        })
    }
}

// display the task item in the task list
const createNewTask = (taskTitle, taskDueDate, taskId, taskPriority) => {
    const eleTask = document.createElement('div')
    const eleTaskTitle = document.createElement('p')
    const eleTaskDueDate = document.createElement('p')
    const elePriority = document.createElement('p')
    const eleDelete = document.createElement('button')

    eleTask.classList.add('taskItem')
    eleTaskTitle.classList.add('taskItemTitle')
    eleTaskDueDate.classList.add('taskItemDueDate')
    elePriority.classList.add('taskItemPriority')
    eleDelete.classList.add('taskItemDelBtn')
    eleTask.setAttribute('id', `task${taskId}`)
    eleDelete.setAttribute('id', `del${taskId}`)
    eleTaskTitle.setAttribute('id', `taskItemTitle${taskId}`)
    eleTaskDueDate.setAttribute('id', `taskItemDueDate${taskId}`)
    elePriority.setAttribute('id', `taskItemPriority${taskId}`)

    eleTaskTitle.textContent = taskTitle
    eleTaskDueDate.textContent = taskDueDate
    elePriority.textContent = taskPriority
    eleDelete.textContent = 'Del'

    eleDelete.addEventListener('click', cbDeleteTask)
    eleTaskTitle.addEventListener('click', cbEditTask)

    eleTask.appendChild(eleTaskTitle)
    eleTask.appendChild(eleTaskDueDate)
    eleTask.appendChild(elePriority)
    eleTask.appendChild(eleDelete)

    return eleTask

}

// create new the project under the project list
const createNewProject = (projectName, id) => {
    const eleProject = document.createElement('div')
    const eleProjectName = document.createElement('p')
    const eleDeleteProject = document.createElement('button')

    eleProject.classList.add('projectItem')
    eleProjectName.classList.add('projectName')
    eleDeleteProject.classList.add('projectDeleteBtn')

    eleProjectName.textContent = projectName
    eleProject.setAttribute('id', `projectItem${id}`)
    eleProjectName.setAttribute('id', `projectName${id}`)
    eleDeleteProject.setAttribute('id', `del${id}`)
    eleDeleteProject.textContent = 'Del'

    eleDeleteProject.addEventListener('click', cbDeleteProject)
    eleProjectName.addEventListener('click', cbShowProject)

    eleProject.appendChild(eleProjectName)
    eleProject.appendChild(eleDeleteProject)

    return eleProject
}

// header of the website
const createHeader = () => {
    const eleHeader = document.createElement('header')
    const eleHeading = document.createElement('h1')
    eleHeading.textContent = 'todo list'
    eleHeader.appendChild(eleHeading)
    return eleHeader
}

// display the todos content
const createTodo = () => {
    const eleTodo = document.createElement('div')
    const eleTodoHeading = document.createElement('h2')

    eleTodo.classList.add('todo')
    eleTodoHeading.classList.add('todoHeading')

    eleTodoHeading.addEventListener('click', cbTodoList)

    eleTodoHeading.textContent = 'Todos'
    eleTodo.appendChild(eleTodoHeading)

    return eleTodo
}

// display the project content
const createProject = () => {
    const eleHeading = document.createElement('h2')
    const eleAddProjectBtn = document.createElement('button')

    tags.eleProject.classList.add('project')
    tags.eleProjectList.classList.add('projectList')
    tags.eleAddProject.classList.add('addProject')
    eleAddProjectBtn.classList.add('addProjectBtn')

    eleAddProjectBtn.textContent = 'Add'
    eleHeading.textContent = 'Projects'

    eleAddProjectBtn.addEventListener('click', cbCreateProject)

    tags.eleAddProject.appendChild(eleAddProjectBtn)
    tags.eleProject.appendChild(eleHeading)
    tags.eleProject.appendChild(tags.eleProjectList)
    tags.eleProject.appendChild(tags.eleAddProject)

    return tags.eleProject
}

// display the navbar of the container
const createNavbar = () => {
    const eleNavbar = document.createElement('div')
    eleNavbar.classList.add('navbar')
    eleNavbar.appendChild(createTodo())
    eleNavbar.appendChild(createProject())

    return eleNavbar
}

// display the content of the container
const createContent = () => {
    const eleContent = document.createElement('div')
    const eleHeading = document.createElement('div')
    const eleAddTask = document.createElement('div')
    const eleAddTaskBtn = document.createElement('button')

    eleContent.classList.add('content')
    eleHeading.classList.add('heading')
    tags.eleTaskList.classList.add('taskList')
    eleAddTask.classList.add('addTask')
    eleAddTaskBtn.classList.add('addTaskBtn')

    tags.eleContentHeading.textContent = "Todos"
    eleAddTaskBtn.textContent = "Add"

    eleAddTaskBtn.addEventListener('click', cbCreateTask)

    eleAddTask.appendChild(eleAddTaskBtn)
    eleHeading.appendChild(tags.eleContentHeading)
    eleContent.appendChild(eleHeading)
    eleContent.appendChild(tags.eleTaskList)
    eleContent.appendChild(eleAddTask)

    return eleContent
}

// display container of the website
const createContainer = () => {
    const eleContainer = document.createElement('div')
    eleContainer.classList.add('container')
    eleContainer.appendChild(createNavbar())
    eleContainer.appendChild(createContent())

    return eleContainer
}

// append header and container into html body
const appendDOM = () => {
    eleBody.appendChild(createHeader())
    eleBody.appendChild(createContainer())
}

// display the projects under project list from the data from the localstorage
const displayProjects = projectsData => {
    const projects = projectsData.filter(project => project.id !== 0)

    projects.forEach(project => {
        let newProject = createNewProject(project.name, project.id)
        tags.eleProjectList.appendChild(newProject)
    })
}

appendDOM()
getData()