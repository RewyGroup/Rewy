package se.rewy.site.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.rewy.site.models.SubCategory;
import se.rewy.site.services.SubCategoryService;

import java.util.Set;
@RestController
@RequestMapping("subCategory")
public class SubCategoryController {



        private final SubCategoryService subCategoryService;

        @Autowired
        public SubCategoryController( SubCategoryService subCategoryService){this.subCategoryService = subCategoryService;}

        @GetMapping("/all/{id}")
        public Set<SubCategory> getAllCategories(@PathVariable long id){
            return subCategoryService.findAllByCategoryId(id);
        }


}
