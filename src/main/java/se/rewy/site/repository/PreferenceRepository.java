package se.rewy.site.repository;

import org.springframework.data.repository.CrudRepository;
import se.rewy.site.models.Preference;

import java.util.Optional;
import java.util.Set;

public interface PreferenceRepository extends CrudRepository<Preference,Long> {
    Set<Preference> findAllByUser_Id (Long userId);
}