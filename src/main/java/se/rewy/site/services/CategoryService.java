package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.Category;
import se.rewy.site.models.SubCategory;
import se.rewy.site.repository.CategoryRepository;

import java.util.HashSet;
import java.util.Set;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public void create(Category category){
        categoryRepository.save(category);
    }

    public Set<Category> findAll(){
        Set<Category> allCategories = categoryRepository.findAll();
        return allCategories;
    }

}
