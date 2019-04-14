/**
 * @author Djiby Ndiaye
 * 04/2019
 */
 
'use strict'

var path = require('path')

class ClassGenerator {
    constructor(name){
        this.name = name;
    }
  generateEntity() {
       return (`<?php
        use Doctrine\\ORM\\Annotation as ORM;
        use Doctrine\\Common\\Collections\\ArrayCollection;
        
        /**
         * @Entity @Table(name="`+`${this.name}`+`")
         **/
        class `+`${this.name}`+`
        {
            /** @Id @Column(type="integer") @GeneratedValue **/
            private $id;
            /** @Column(type="string") **/
            private $nom;
            /** @Column(type="string") **/
            private $prenom;
            /** @Column(type="string") **/
            private $email;
            /** @Column(type="string") **/
            private $password;
            /**
             * Many Users have One Roles.
             * @ManyToOne(targetEntity="Roles", inversedBy="users")
             */
            private $role;
            
            public function __construct()
            {
                $this->role = new ArrayCollection();
            }
            public function getId()
            {
                return $this->id;
            }
            public function setId($id)
            {
                $this->id = $id;
            }
        
            public function getNom()
            {
                return $this->nom;
            }
            public function setNom($nom)
            {
                $this->nom = $nom;
            }
        
            public function getPrenom()
            {
                return $this->prenom;
            }
            public function setPrenom($prenom)
            {
                $this->prenom = $prenom;
            }
        
            public function getEmail()
            {
                return $this->email;
            }
            public function setEmail($email)
            {
                $this->email = $email;
            }
            
            public function getPassword()
            {
                return $this->password;
            }
            public function setPassword($password)
            {
                $this->password = $password;
            }
          
            public function getRole()
            {
                return $this->role;
            }
            public function setRole($role)
            {
                $this->role = $role;
            }
        }
        
        ?>`)
    }

    generateController() {
        return (`<?php
        /*==================================================
            MODELE MVC DEVELOPPE PAR Ngor SECK
            ngorsecka@gmail.com
            (+221) 77 - 433 - 97 - 16
            PERFECTIONNEZ CE MODELE ET FAITES MOI UN RETOUR
            POUR TOUTE MODIFICATION VISANT A L'AMELIORER.
            VOUS ETES LIBRE DE TOUTE UTILISATION.
          ===================================================*/ 
            use libs\\system\\Controller; 
        
            use src\\model\\`+`${this.name}`+`DB;
            use src\\model\\`+`${this.name}`+`DBOrm;
            class `+`${this.name}`+`Controller extends Controller{
                
                public function __construct(){
                    parent::__construct();
                    /** 
                     * Appel du model grace au systeme autoloading
                     */
                }
        
                /**
                 * A noter que toutes les views de ce controller doivent être créées dans le dossier view/test
                *Ne tester pas toutes les methodes, ce controller est un prototype pour vous aider à mieux comprendre
                */
                
                public function index(){
        
                    return $this->view->load("test/index");
                }
        
                public function getID($id){
                    $data['ID'] = $id;
        
                    return $this->view->load("`+`${this.name}`+`/get_id", $data);
                }
                
                public function get($id){
                    $tdb = new `+`${this.name}`+`DBOrm();
        
                    $data['test'] = $tdb->get`+`${this.name}`+`($id);
                    
                    return $this->view->load("test/get", $data);
                }
                public function liste(){
                    $tdb = new `+`${this.name}`+`DBOrm();
                    
                    $data['tests'] = $tdb->liste`+`${this.name}`+`();
                    return $this->view->load("`+`${this.name}`+`/liste", $data);
                }
            
            
                public function add(){
                    $tdb = new TestDBOrm();
                    if(isset($_POST['valider']))
                    {
                        extract($_POST);
                        $data['ok'] = 0;
                        if(!empty($valeur1) && !empty($valeur2)) {
                            
                            $testObject = new Test();
                            $testObject->setValeur1($valeur1);
                            $testObject->setValeur2($valeur2);
        
                            $ok = $tdb->addTest($testObject);
                            $data['ok'] = $ok;
                        }
                        return $this->view->load("test/add", $data);
                    }else{
                        return $this->view->load("test/add");
                    }
                }
                public function update(){
                    $tdb = new TestDBOrm();
                    if(isset($_POST['modifier'])){
                        extract($_POST);
                        if(!empty($id) && !empty($valeur1) && !empty($valeur2)) {
                            $testObject = new Test();
                            $testObject->setId($id);
                            $testObject->setValeur1($valeur1);
                            $testObject->setValeur2($valeur2);
                            $ok = $tdb->updateTest($testObject);
                        }
                    }
                   
                    return $this->liste();
                }
                public function delete($id){
                    /** 
                     * Instanciation du model
                     */
                    $tdb = new TestDBOrm();
                    /** 
                     * Supression
                     **/
                    $tdb->deleteTest($id);
                    /** 
                     * Retour vers la liste
                     */
                    return $this->liste();
                }
                
                public function edit($id){
                    
                    /** 
                     * Instanciation du model
                     */
                    $tdb = new TestDBOrm();
                    /**
                     *Supression
                     */
                    $data['test'] = $tdb->getTest($id);
                    var_dump($tdb->getTest($id));
                    /** 
                     * chargement de la vue edit.html
                     */
                    return $this->view->load("test/edit", $data);
                }
            }
        ?>`)
    }

    generateModel() {
        return (`<?php
        /*==================================================
            MODELE MVC DEVELOPPE PAR Ngor SECK
            ngorsecka@gmail.com
            (+221) 77 - 433 - 97 - 16
            PERFECTIONNEZ CE MODELE ET FAITES MOI UN RETOUR
            POUR TOUTE MODIFICATION VISANT A L'AMELIORER.
            VOUS ETES LIBRE DE TOUTE UTILISATION.
          ===================================================*/
            namespace src\\model; 
            
            use libs\\system\\Model; 
              
            class `+`${this.name}`+`DBOrm extends Model{
                
                
                
                /**
                 * La base de données samane_test est dans src/view/test
                 * Pour tester importer la 
                 */
                public function __construct(){
                    parent::__construct();
                }
        
                public function get`+`${this.name}`+`($ID)
                {
                    if($this->db != null)
                    {
                        return $this->db->getRepository('`+`${this.name}`+`')->find(array('id' => $ID));
        
                    }else{
                        return null;
                    }
                }
                
                public function add`+`${this.name}`+`($test){
                    if($this->db != null)
                    {
                        $this->db->persist($test);
                        $this->db->flush();
        
                        return $test->getId();
                        
                    }else{
                        return null;
                    }
                }
                
                public function delete`+`${this.name}`+`($id){
                    
                    if($this->db != null)
                    {
                        $test = $this->db->find('Test', $id);
                        if($test != null)
                        {
                            $this->db->remove($test);
                            $this->db->flush();
                        }else {
                            die("Objet ".$id." n'existe pas!");
                        }
                        
                    }else{
                        return null;
                    }
                }
                
                public function update`+`${this.name}`+`($test){
                    
                    if($this->db != null)
                    {
                        $getTest = $this->db->find('Test', $test->getId());
                        if($getTest != null)
                        {
                            $getTest->setValeur1($test->getValeur1());
                            $getTest->setValeur2($test->getValeur2());
                            $this->db->flush();
        
                        }else {
                            die("Objet ".$test->getId()." n'existe pas!");
                        }
                        
                    }else{
                        return null;
                    }
                }
                
                public function liste`+`${this.name}`+`(){
                    
                    if($this->db != null)
                    {
                        return $this->db
                                ->createQuery("SELECT t FROM `+`${this.name}`+` t")
                                ->getResult();
                        /**
                         * ou bien
                         * return $this->db->getRepository('`+`${this.name}`+`')->findAll();
                        */
                    }else{
                        return null;
                    }
                }
                /*
                public function liste`+`${this.name}`+`sById($id)
                {
                    if($this->db != null)
                    {
                        return $this->db->getRepository('`+`${this.name}`+`')->findBy(array('id' => $id));
        
                    }else{
                        return null;
                    }
                }
                //oubien 
                public function listeOf`+`${this.name}`+`sById($id){
                    
                    if($this->db != null)
                    {
                        return $this->db
                                ->createQuery("SELECT t FROM Test t WHERE t.id = " . $id)
                                ->getResult();
                        //ou bien
                        //return $this->db->getRepository('`+`${this.name}`+`')->findAll();
                    }else{
                        return null;
                    }
                }
                */
            }`)
    }
}
module.exports = ClassGenerator