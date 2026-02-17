import { useTranslation } from "react-i18next";
import workData from "../data/work.json";
import projectsData from "../data/projects.json";
import i18n from "../i18n";

const Work = () => {
  const { t } = useTranslation();
  const workEntries = Object.entries(workData);
  return (
    <div id="work">
      <h1>{t("work.title")}</h1>
      <div className="container">
        {workEntries.map(([key, job]) => (
          <div key={key} className="card">
            <h3>
              {t("work.position")} - {job.company}
            </h3>
            <h4>
              {t(`months.${job.startMonth}`)} {job.startYear} -{" "}
              {t(`months.${job.endMonth}`)} {job.endYear}
            </h4>
            <ul>
              {job.responsibilities.map((_resp, index) => (
                <li key={index}>{t(`work.${index + 1}`)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a
        href={i18n.language === "en" ? "/cv-en.html" : "/cv-fi.html"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="action-button">{t("work.viewCV")}</button>
      </a>

      <h1 className="projects-title">{t("projects.title")}</h1>
      <div className="container projects">
        {projectsData.Projects.map((project, index) => (
          <div key={index} className="card">
            <h3>{t(`projects.${index + 1}.name`)}</h3>
            <p>{t(`projects.${index + 1}.description`)}</p>
            <h3>{t("projects.technologies")}</h3>
            <ul className="technologies-list">
              {project.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <button className="action-button">{t("projects.viewProject")}</button>
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <button className="action-button">{t("projects.viewGitHub")}</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
