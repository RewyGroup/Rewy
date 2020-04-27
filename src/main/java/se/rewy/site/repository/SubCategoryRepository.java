package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.SubCategory;

import java.util.Optional;

public interface SubCategoryRepository extends CrudRepository<SubCategory,Long> {

    Optional<SubCategory> findByName(String name);
}
