package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.SubCategory;

import java.util.Optional;
import java.util.Set;

public interface SubCategoryRepository extends CrudRepository<SubCategory,Long> {

    Optional<SubCategory> findByName(String name);
    Set<SubCategory> findAllByCategoryId(long id);
}
