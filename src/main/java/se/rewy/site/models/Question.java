package se.rewy.site.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String text;

    @OneToOne
    private User user;

    @OneToOne
    private Category category;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "question_sub_category_list",
            joinColumns = @JoinColumn(name ="question_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_category_id"))
    private Set<SubCategory> subCategoryList;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "question", cascade = CascadeType.ALL)
    @OrderBy("createdAt")
    private Set<Answer> answers;

    @ManyToMany
    private Set<Vote> votes;

    private LocalDateTime createdAt;

    public Question() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<SubCategory> getSubCategoryList() {
        return subCategoryList;
    }

    public void setSubCategoryList(Set<SubCategory> subCategoryList) {
        this.subCategoryList = subCategoryList;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
    }

    public Set<Vote> getVotes() {
        return votes;
    }

    public void setVotes(Set<Vote> votes) {
        this.votes = votes;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
