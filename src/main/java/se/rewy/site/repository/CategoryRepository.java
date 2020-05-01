package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Category;

import java.util.Optional;
import java.util.Set;

public interface CategoryRepository extends CrudRepository<Category,Long> {

    Optional<Category> findByTypeName(String typeName);

    Set<Category> findAll();
}
