module.exports.getAboutYourself = function (aboutYourself) {
  if (aboutYourself) {
    return `
      <div class="profile">
        <p class="profile-title">Profile</p>
        <p class="profile-text">${aboutYourself}</p>
      </div>
    `
  } else {
    return ''
  }
}

module.exports.getSkills = function (skills) {
  const skillsArray = JSON.parse(skills)
  if (skillsArray.length) {
    let skillsStringifyArray = skillsArray.map((skill, idx) => {
      return `<li class="skill">
            <p class="skill-name">
             ${skillsArray.length !== idx + 1 ? skill + ',&nbsp;' : skill}
            </p>
           </li>`
    })
    return `
      <div class="skills">
        <p class="skills-title">Skills</p>
        <ul class="skills-list">
          ${skillsStringifyArray.join("")}
        </ul>
      </div>
    `
  } else {
    return ''
  }
}

module.exports.getSocialLinks = function (links) {
  const linksArray = JSON.parse(links)
  if (linksArray.length) {
    const linksStringifyArray = linksArray.map(item => {
      return `
        <li class="social-link">
            <p class="social-link-name">${item.linkLabel}</p>
            <a 
            class="social-link-link" 
            href="http://${item.link}">${item.link}</a>
        </li>
      `
    })
    return `
      <div class="social-links">
        <p class="social-links-title">Social Links</p>
         <ul class="social-links-list">
            ${linksStringifyArray.join("")}
         </ul>
      </div>
    `
  } else {
    return ''
  }
}

module.exports.getEmploymentHistory = function (history) {

  const historyArray = JSON.parse(history)
  if (historyArray.length) {
    const historyStringifyArray = historyArray.map(job => {
      return `
      <div class="job">
        <p class="job-title">${job.title} | ${job.org}</p>
        <p class="job-location">${job.country}, ${job.city}</p>
        <p class="job-period">${job.startDate} - ${job.endDate}</p>
        <p class="job-description"></p>
      </div>
      `
    })

    return `
      <div class="employment-history">
        <p class="employment-history-title">Employment History</p>
        ${historyStringifyArray.join("")}
      </div>
    `
  } else {
    return ''
  }

}

module.exports.getEducationHistory = function (history) {
  const historyArray = JSON.parse(history)
  if (historyArray.length) {
    const historyStringifyArray = historyArray.map(school => {
      return `
        <div class="school">
          <p class="school-place">${school.title}, ${school.org}</p>
          <div class="school-location">${school.country}, ${school.city}</div>
          <p class="school-period">${school.startDate} - ${school.endDate}</p>
        </div>
      `
    })

    return `
      <div class="education">
        <p class="education-title">Education</p>
        ${historyStringifyArray.join("")}
      </div>
    `
  } else {
    return ''
  }
}

module.exports.getLanguages = function (languages) {
  const languagesArray = JSON.parse(languages)
  if (languagesArray.length) {
    const languagesStringifyArray = languagesArray.map(language => {
      return `
        <li class="language">
          <p class="language-title">${language.languageName}</p>
          <p class="language-level">${language.languageLevel}</p>
        </li>
      `
    })

    return `
      <div class="languages">
        <p class="languages-title">Languages</p>
        <ul class="languages-list">
          ${languagesStringifyArray.join("")}
        </ul>
      </div>
    `
  } else {
    return ''
  }
}
