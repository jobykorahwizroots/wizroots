package org.wizroots.repository;

import org.wizroots.domain.Designation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Designation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DesignationRepository extends JpaRepository<Designation, Long> {

    @Query("select designation from Designation designation where designation.user.login = ?#{principal.username}")
    List<Designation> findByUserIsCurrentUser();

}
