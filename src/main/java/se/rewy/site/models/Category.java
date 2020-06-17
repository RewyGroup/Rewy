package se.rewy.site.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import java.util.Set;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String typeName;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "category", cascade = CascadeType.ALL)
    @OrderBy("name asc")
    private Set<SubCategory> subCategoryList;




    public Category() {
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypename(String typeName) {
        this.typeName = typeName;
    }

    public Set<SubCategory> getSubCategoryList() {
        return subCategoryList;
    }
    public void setSubCategoryList(Set<SubCategory> subCategoryList) {
        this.subCategoryList = subCategoryList;
    }
}
