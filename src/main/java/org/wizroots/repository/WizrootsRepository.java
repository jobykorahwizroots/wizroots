package org.wizroots.repository;

import org.wizroots.domain.Wizroots;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Wizroots entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WizrootsRepository extends JpaRepository<Wizroots, Long> {

}
