const today = new Date();
const thisYear = today.getFullYear();
const skills = [
  {
    title: "Full-Stack Development:",
    description: "Proficient in both frontend and backend development.",
  },
  {
    title: "Frontend Frameworks:",
    description:
      "Skilled in building interactive user interfaces using modern frameworks.",
  },
  {
    title: "Backend Technologies:",
    description:
      "Experienced in developing scalable and efficient server-side solutions.",
  },
  {
    title: "Responsive Web Design:",
    description: "Ensuring seamless functionality across devices.",
  },
  {
    title: "Version Control:",
    description: "Experienced in using Git for collaborative development.",
  },
  {
    title: "Database Management:",
    description: "Familiar with working with various databases.",
  },
  {
    title: "Web Performance Optimization:",
    description: "Implementing strategies for enhanced site speed.",
  },
  {
    title: "UI/UX Principles:",
    description: "Applying design principles for intuitive user experiences.",
  },
  {
    title: "Problem-Solving:",
    description:
      "Adept at breaking down complex challenges into manageable solutions.",
  },
];

const footer = document.querySelector("footer");
const copyright = document.createElement("p");
const author = document.querySelector(`meta[name="author"]`).content;
const skillsSelection = document.getElementById("skills");
const skillsList = skillsSelection.querySelector("ul");

const messageForm = document.querySelector(`form[name="leave_message"]`);

copyright.textContent = `${author} © ${thisYear}`;
copyright.style["font-style"] = "italic";
footer.appendChild(copyright);

for (const item of skills) {
  const skill = document.createElement("li");
  const skillDescription = document.createElement("span");
  skillDescription.textContent = ` ${item["description"]}`;
  skill.textContent = item["title"];
  skill.style["font-weight"] = "bold";
  skillDescription.style["font-weight"] = "normal";

  skillsList.appendChild(skill).appendChild(skillDescription);
}

skillsList.setAttribute("class", "skill-list");

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usersName = event.target.usersName;
  const usersEmail = event.target.usersEmail;
  const usersMessage = event.target.usersMessage;

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");
  const anchor = document.createElement("a");
  const span = document.createElement("span");
  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  anchor.href = `mailto:${usersEmail.value}`;
  anchor.textContent = usersName.value;
  span.textContent = ` wrote: ${usersMessage.value}`;
  newMessage.appendChild(span);
  newMessage.insertBefore(anchor, span);

  /*
  // For security concerns limit the use of innerHtml
  newMessage.innerHTML = `<a href="mailto:${usersEmail.value}">${usersName.value}</a><span>${usersMessage.value}</span>`;
  */

  editButton.textContent = "edit";
  editButton.type = "button";
  editButton.addEventListener("click", (event) => {
    const updateEntry = editButton.parentElement;

    usersName.value = anchor.textContent;
    usersEmail.value = `${anchor.href}`.slice(7);
    usersMessage.value = `${span.textContent}`.slice(8);

    updateEntry.remove();
  });

  removeButton.textContent = "remove";
  removeButton.type = "button";
  removeButton.setAttribute("class", "remove-button");
  removeButton.addEventListener("click", (event) => {
    const entry = removeButton.parentElement;

    entry.remove();
    if (messageList.children.length === 0) {
      messageSection.toggleAttribute("hidden");
    }
  });

  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  // console.log(usersName, usersEmail, usersMessage);
  messageForm.reset();

  if (messageSection.hasAttribute("hidden")) {
    messageSection.toggleAttribute("hidden");
  }
});

// Fetch GitHub Repositories
const githubRequest = new XMLHttpRequest();
githubRequest.open("GET", "https://api.github.com/users/xasterisc/repos", true);
githubRequest.send();

// Handle Response from Server
githubRequest.onload = function () {
  const repositories = JSON.parse(this.response);
  console.log(repositories);

  // Display Repositories in List
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");

  for (let i = 0; i < repositories.length; i++) {
    const project = document.createElement("li");
    const projectLink = document.createElement("a");
    const descriptionParagraph = document.createElement("p");
    const creationDate = document.createElement("p");
    const createdAt = new Date(repositories[i].created_at);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    projectLink.textContent = repositories[i].name;
    projectLink.setAttribute("id", "project-link");
    projectLink.setAttribute("href", repositories[i].html_url);
    projectLink.setAttribute("title", repositories[i].name);
    projectLink.setAttribute("target", "_blank");
    projectLink.setAttribute("rel", "noopener noreferrer");

    creationDate.textContent =
      "Created at: " +
      monthNames[createdAt.getMonth()] +
      " " +
      createdAt.getDate() +
      ", " +
      createdAt.getFullYear();

    projectList
      .appendChild(project)
      .appendChild(projectLink)
      .appendChild(creationDate);

    if (repositories[i].description) {
      descriptionParagraph.textContent = repositories[i].description;
      descriptionParagraph.style.fontStyle = "italic";
      descriptionParagraph.style.fontWeight = "lighter"
      projectLink.appendChild(descriptionParagraph);
    }
  }
};
