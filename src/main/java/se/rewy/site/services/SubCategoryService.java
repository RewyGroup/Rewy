package se.rewy.site.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.rewy.site.models.SubCategory;
import se.rewy.site.repository.SubCategoryRepository;

import java.util.Set;

@Service
public class SubCategoryService {
    private final SubCategoryRepository subCategoryRepository;

    @Autowired
    public SubCategoryService(SubCategoryRepository subCategoryRepository){
        this.subCategoryRepository = subCategoryRepository;
    }

    public void create (SubCategory subCategory){
        subCategoryRepository.save(subCategory);
    }

    public SubCategory findById (long id){
        return subCategoryRepository.findById(id).get();
    }

    public Set<SubCategory> findAllByCategoryId(long id){return  subCategoryRepository.findAllByCategoryId(id);}
}
