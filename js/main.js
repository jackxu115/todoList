const eleBody = document.body

const tags = {
    eleProjectList: document.createElement('div'),
    eleNoteList: document.createElement('div'),
    eleContentHeading: document.createElement('h2'),
    eleTaskList: document.createElement('div'),
    eleAddProject: document.createElement('div'),
    eleProject: document.createElement('div'),
    eleNewProject: null
}

const data = {
    projectName: null,
    projectId: 0
}

let projectList = []

const project = (name, id) => {
    const task = []
    return {name, id, task}
}


const newProject = () => {
    const eleNewProject= document.createElement('div')
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

const cbInputProject = event => {
    data.projectName = event.target.value
}


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
    }
}

const cbCancelProject = event => {
    console.log('cancel new project')
    tags.eleProject.appendChild(tags.eleAddProject)
    tags.eleProject.removeChild(tags.eleNewProject)
}

const cbCreateProject = event => {
    console.log('add project')
    tags.eleProject.appendChild(newProject())
    tags.eleProject.removeChild(tags.eleAddProject)
    // tags.eleAddProject.setAttribute('style', 'visibility: hidden')
}

const cbDeleteProject = event => {
    const index = parseInt(event.target.id.charAt(3))
    projectList = projectList.filter(element => element.id !== index)
    const deleteProjectId = `projectItem${index}`
    const deleteProject = document.querySelector(`#${deleteProjectId}`)
    tags.eleProjectList.removeChild(deleteProject)
    console.log(projectList)
}

const cbCreateTask = event => {
    event.target.dataset.projectId = data.projectId

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

    eleTitleLabel.textContent = 'Name'
    eleDesLabel.textContent = 'Description'
    eleDueDateLabel.textContent = 'Due Date'
    elePriorityLabel.textContent = 'Priority'
    eleHigh.textContent = 'High'
    eleMed.textContent = 'Medium'
    eleLow.textContent = 'Low'

    eleDueDateInput.setAttribute('type', 'date')

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
    tags.eleTaskList.appendChild(eleTaskInfo)

    console.log(event.target.dataset)

}

const createNewProject = (projectName, id) => {
    const eleProject = document.createElement('div')
    const eleProjectName = document.createElement('p')
    const eleDeleteProject = document.createElement('button')

    eleProject.classList.add('projectItem')
    eleProjectName.classList.add('projectName')
    eleDeleteProject.classList.add('projectDeleteBtn')

    eleProjectName.textContent = projectName
    eleProject.setAttribute('id', `projectItem${id}`)
    eleProjectName.setAttribute('id', `${projectName}${id}`)
    eleDeleteProject.setAttribute('id', `del${id}`)
    eleDeleteProject.textContent = 'Del'

    eleDeleteProject.addEventListener('click', cbDeleteProject)

    eleProject.appendChild(eleProjectName)
    eleProject.appendChild(eleDeleteProject)

    return eleProject

}


const createHeader = () => {
    const eleHeader = document.createElement('header')
    const eleHeading = document.createElement('h1')
    eleHeading.textContent = 'todo list'
    eleHeader.appendChild(eleHeading)
    return eleHeader
}

const createTodo = () => {
    const eleTodo = document.createElement('div')
    const eleTodoHeading = document.createElement('h2')

    eleTodo.classList.add('todo')
    eleTodoHeading.classList.add('todoHeading')

    eleTodoHeading.textContent = 'Todos'
    eleTodo.appendChild(eleTodoHeading)

    return eleTodo
}

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


const createNavbar = () => {
    const eleNavbar = document.createElement('div')
    eleNavbar.classList.add('navbar')
    eleNavbar.appendChild(createTodo())
    eleNavbar.appendChild(createProject())

    return eleNavbar
}

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

const createContainer = () => {
    const eleContainer = document.createElement('div')
    eleContainer.classList.add('container')
    eleContainer.appendChild(createNavbar())
    eleContainer.appendChild(createContent())

    return eleContainer
}


const appendDOM = () => {
    eleBody.appendChild(createHeader())
    eleBody.appendChild(createContainer())
}


const Project = project('todo', 0)
projectList.push(Project)
appendDOM()