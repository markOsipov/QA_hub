package qa_hub.controller

import com.mongodb.client.result.DeleteResult
import com.mongodb.client.result.InsertOneResult
import com.mongodb.client.result.UpdateResult
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import qa_hub.entity.Project
import qa_hub.service.ProjectService

@RestController
@RequestMapping("/api/projects")
class ProjectController {
    @Autowired
    lateinit var projectService: ProjectService

    @GetMapping("")
    fun getProjects(): List<Project> {
        return projectService.getProjects()
    }

    @GetMapping("/{projectName}")
    fun getProject(@PathVariable projectName: String): Project? {
        return projectService.getProject(projectName)
    }

    @PostMapping("/{projectName}/delete")
    fun deleteProject(@PathVariable projectName: String): DeleteResult {
        return projectService.deleteProject(projectName)
    }

    @PostMapping("/upsert")
    fun editProject(@RequestBody body: Project): UpdateResult {
        return projectService.upsertConfig(body)
    }
}