package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.rewy.site.models.Category;
import se.rewy.site.services.CategoryService;

import java.util.Set;

@RestController
@RequestMapping("category")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){this.categoryService = categoryService;}

    @GetMapping("/all")
        public Set<Category> getAllCategories(){
        return categoryService.findAll();
        }

}
