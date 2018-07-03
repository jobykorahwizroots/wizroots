package org.wizroots.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.wizroots.domain.Wizroots;
import org.wizroots.repository.WizrootsRepository;
import org.wizroots.web.rest.errors.BadRequestAlertException;
import org.wizroots.web.rest.util.HeaderUtil;
import org.wizroots.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Wizroots.
 */
@RestController
@RequestMapping("/api")
public class WizrootsResource {

    private final Logger log = LoggerFactory.getLogger(WizrootsResource.class);

    private static final String ENTITY_NAME = "wizroots";

    private final WizrootsRepository wizrootsRepository;

    public WizrootsResource(WizrootsRepository wizrootsRepository) {
        this.wizrootsRepository = wizrootsRepository;
    }

    /**
     * POST  /wizroots : Create a new wizroots.
     *
     * @param wizroots the wizroots to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wizroots, or with status 400 (Bad Request) if the wizroots has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wizroots")
    @Timed
    public ResponseEntity<Wizroots> createWizroots(@Valid @RequestBody Wizroots wizroots) throws URISyntaxException {
        log.debug("REST request to save Wizroots : {}", wizroots);
        if (wizroots.getId() != null) {
            throw new BadRequestAlertException("A new wizroots cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Wizroots result = wizrootsRepository.save(wizroots);
        return ResponseEntity.created(new URI("/api/wizroots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wizroots : Updates an existing wizroots.
     *
     * @param wizroots the wizroots to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wizroots,
     * or with status 400 (Bad Request) if the wizroots is not valid,
     * or with status 500 (Internal Server Error) if the wizroots couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wizroots")
    @Timed
    public ResponseEntity<Wizroots> updateWizroots(@Valid @RequestBody Wizroots wizroots) throws URISyntaxException {
        log.debug("REST request to update Wizroots : {}", wizroots);
        if (wizroots.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Wizroots result = wizrootsRepository.save(wizroots);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wizroots.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wizroots : get all the wizroots.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of wizroots in body
     */
    @GetMapping("/wizroots")
    @Timed
    public ResponseEntity<List<Wizroots>> getAllWizroots(Pageable pageable) {
        log.debug("REST request to get a page of Wizroots");
        Page<Wizroots> page = wizrootsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/wizroots");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /wizroots/:id : get the "id" wizroots.
     *
     * @param id the id of the wizroots to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wizroots, or with status 404 (Not Found)
     */
    @GetMapping("/wizroots/{id}")
    @Timed
    public ResponseEntity<Wizroots> getWizroots(@PathVariable Long id) {
        log.debug("REST request to get Wizroots : {}", id);
        Optional<Wizroots> wizroots = wizrootsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(wizroots);
    }

    /**
     * DELETE  /wizroots/:id : delete the "id" wizroots.
     *
     * @param id the id of the wizroots to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wizroots/{id}")
    @Timed
    public ResponseEntity<Void> deleteWizroots(@PathVariable Long id) {
        log.debug("REST request to delete Wizroots : {}", id);

        wizrootsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
