package org.wizroots.web.rest;

import org.wizroots.WizrootsApp;

import org.wizroots.domain.Wizroots;
import org.wizroots.repository.WizrootsRepository;
import org.wizroots.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static org.wizroots.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WizrootsResource REST controller.
 *
 * @see WizrootsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = WizrootsApp.class)
public class WizrootsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DOB = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PLACE = "AAAAAAAAAA";
    private static final String UPDATED_PLACE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private WizrootsRepository wizrootsRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWizrootsMockMvc;

    private Wizroots wizroots;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WizrootsResource wizrootsResource = new WizrootsResource(wizrootsRepository);
        this.restWizrootsMockMvc = MockMvcBuilders.standaloneSetup(wizrootsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Wizroots createEntity(EntityManager em) {
        Wizroots wizroots = new Wizroots()
            .name(DEFAULT_NAME)
            .dob(DEFAULT_DOB)
            .place(DEFAULT_PLACE)
            .address(DEFAULT_ADDRESS);
        return wizroots;
    }

    @Before
    public void initTest() {
        wizroots = createEntity(em);
    }

    @Test
    @Transactional
    public void createWizroots() throws Exception {
        int databaseSizeBeforeCreate = wizrootsRepository.findAll().size();

        // Create the Wizroots
        restWizrootsMockMvc.perform(post("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wizroots)))
            .andExpect(status().isCreated());

        // Validate the Wizroots in the database
        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeCreate + 1);
        Wizroots testWizroots = wizrootsList.get(wizrootsList.size() - 1);
        assertThat(testWizroots.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWizroots.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testWizroots.getPlace()).isEqualTo(DEFAULT_PLACE);
        assertThat(testWizroots.getAddress()).isEqualTo(DEFAULT_ADDRESS);
    }

    @Test
    @Transactional
    public void createWizrootsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wizrootsRepository.findAll().size();

        // Create the Wizroots with an existing ID
        wizroots.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWizrootsMockMvc.perform(post("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wizroots)))
            .andExpect(status().isBadRequest());

        // Validate the Wizroots in the database
        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = wizrootsRepository.findAll().size();
        // set the field null
        wizroots.setName(null);

        // Create the Wizroots, which fails.

        restWizrootsMockMvc.perform(post("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wizroots)))
            .andExpect(status().isBadRequest());

        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDobIsRequired() throws Exception {
        int databaseSizeBeforeTest = wizrootsRepository.findAll().size();
        // set the field null
        wizroots.setDob(null);

        // Create the Wizroots, which fails.

        restWizrootsMockMvc.perform(post("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wizroots)))
            .andExpect(status().isBadRequest());

        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlaceIsRequired() throws Exception {
        int databaseSizeBeforeTest = wizrootsRepository.findAll().size();
        // set the field null
        wizroots.setPlace(null);

        // Create the Wizroots, which fails.

        restWizrootsMockMvc.perform(post("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wizroots)))
            .andExpect(status().isBadRequest());

        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWizroots() throws Exception {
        // Initialize the database
        wizrootsRepository.saveAndFlush(wizroots);

        // Get all the wizrootsList
        restWizrootsMockMvc.perform(get("/api/wizroots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(wizroots.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].place").value(hasItem(DEFAULT_PLACE.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())));
    }
    

    @Test
    @Transactional
    public void getWizroots() throws Exception {
        // Initialize the database
        wizrootsRepository.saveAndFlush(wizroots);

        // Get the wizroots
        restWizrootsMockMvc.perform(get("/api/wizroots/{id}", wizroots.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(wizroots.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()))
            .andExpect(jsonPath("$.place").value(DEFAULT_PLACE.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWizroots() throws Exception {
        // Get the wizroots
        restWizrootsMockMvc.perform(get("/api/wizroots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWizroots() throws Exception {
        // Initialize the database
        wizrootsRepository.saveAndFlush(wizroots);

        int databaseSizeBeforeUpdate = wizrootsRepository.findAll().size();

        // Update the wizroots
        Wizroots updatedWizroots = wizrootsRepository.findById(wizroots.getId()).get();
        // Disconnect from session so that the updates on updatedWizroots are not directly saved in db
        em.detach(updatedWizroots);
        updatedWizroots
            .name(UPDATED_NAME)
            .dob(UPDATED_DOB)
            .place(UPDATED_PLACE)
            .address(UPDATED_ADDRESS);

        restWizrootsMockMvc.perform(put("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWizroots)))
            .andExpect(status().isOk());

        // Validate the Wizroots in the database
        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeUpdate);
        Wizroots testWizroots = wizrootsList.get(wizrootsList.size() - 1);
        assertThat(testWizroots.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWizroots.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testWizroots.getPlace()).isEqualTo(UPDATED_PLACE);
        assertThat(testWizroots.getAddress()).isEqualTo(UPDATED_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingWizroots() throws Exception {
        int databaseSizeBeforeUpdate = wizrootsRepository.findAll().size();

        // Create the Wizroots

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWizrootsMockMvc.perform(put("/api/wizroots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wizroots)))
            .andExpect(status().isBadRequest());

        // Validate the Wizroots in the database
        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWizroots() throws Exception {
        // Initialize the database
        wizrootsRepository.saveAndFlush(wizroots);

        int databaseSizeBeforeDelete = wizrootsRepository.findAll().size();

        // Get the wizroots
        restWizrootsMockMvc.perform(delete("/api/wizroots/{id}", wizroots.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Wizroots> wizrootsList = wizrootsRepository.findAll();
        assertThat(wizrootsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Wizroots.class);
        Wizroots wizroots1 = new Wizroots();
        wizroots1.setId(1L);
        Wizroots wizroots2 = new Wizroots();
        wizroots2.setId(wizroots1.getId());
        assertThat(wizroots1).isEqualTo(wizroots2);
        wizroots2.setId(2L);
        assertThat(wizroots1).isNotEqualTo(wizroots2);
        wizroots1.setId(null);
        assertThat(wizroots1).isNotEqualTo(wizroots2);
    }
}
