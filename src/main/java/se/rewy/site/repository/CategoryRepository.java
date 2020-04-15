package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Category;

public interface CategoryRepository extends CrudRepository<Category,Long> {
}
