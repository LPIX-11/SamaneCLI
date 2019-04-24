/**
 * @author Djiby Ndiaye
 * 04/2019
 * Edited by Mohamed Johnson
 */
 
'use strict'

const fs = require('fs');

class Generator {
    constructor(name){
        this.name = name;
    }
    
    generateEntityContent() {

        let content = ''
        
        content += `<?php
    /*==================================================
        MODELE MVC DEVELOPPE PAR Ngor SECK
        ngorsecka@gmail.com
        (+221) 77 - 433 - 97 - 16
        PERFECTIONNEZ CE MODELE ET FAITES MOI UN RETOUR
        POUR TOUTE MODIFICATION VISANT A L'AMELIORER.
        VOUS ETES LIBRE DE TOUTE UTILISATION.
      ===================================================*/
    
    use Doctrine\\ORM\\Annotation as ORM;
    use Doctrine\\Common\\Collections\\ArrayCollection;`
          
    content += `    
    /**
     * @Entity @Table(name="`+`${this.name}`+`")
     **/
    class `+`${this.name}`+` {`
    
    content += `    

        /** @Id @Column(type="integer") @GeneratedValue **/
        private $uid;
        
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
        private $role;`
                
        content += `    

        public function __construct()
        {
            $this->role = new ArrayCollection();
        }
        
        public function getId()
        {
            return $this->id;
        }`
        
        content += `
    }
    
?>`

        return content
       return (`<?php
        
           
            
            
            
        
        ?>`)
    }

    generateControllerContent() {
        let content = ''
        
        content += `<?php
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
    use src\\model\\`+`${this.name}`+`DBOrm;` 
              
        content += `    
    class ` + `${this.name}` + `Controller extends Controller {
                
        public function __construct() {
            parent::__construct();
            /** 
             * Appel du model grace au systeme autoloading
             */
        }`
        
        content += `    

        /**
         * A noter que toutes les views de ce controller doivent être créées dans le dossier view/test
         * Ne tester pas toutes les methodes, ce controller est un prototype pour vous aider à mieux comprendre
         */
        
        public function index(){

            return $this->view->load("test/index");
        }

        public function getID($uid){
            $data['uid'] = $uid;

            return $this->view->load("`+`${this.name}`+`/get_id", $data);
        }`
                
        content += `    

        public function get($uid) {
            $tdb = new `+`${this.name}`+`DBOrm();

            $data['test'] = $tdb->get`+`${this.name}`+`($uid);
            
            return $this->view->load("test/get", $data);
        }

        public function liste(){
            $tdb = new `+`${this.name}`+`DBOrm();
            
            $data['tests'] = $tdb->liste`+`${this.name}`+`();
            return $this->view->load("`+`${this.name}`+`/liste", $data);
        }`
                
        content += `    

        public function add() {
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

        public function update() {
            $tdb = new TestDBOrm();
            if(isset($_POST['modifier'])){
                extract($_POST);
                if(!empty($uid) && !empty($valeur1) && !empty($valeur2)) {
                    $testObject = new Test();
                    $testObject->setId($uid);
                    $testObject->setValeur1($valeur1);
                    $testObject->setValeur2($valeur2);
                    $ok = $tdb->updateTest($testObject);
                }
            }
           
            return $this->liste();
        }`
                
        content += `    

        public function delete($uid) {
            /** 
             * Instanciation du model
             */
            $tdb = new TestDBOrm();
            
            /** 
             * Supression
             **/
            $tdb->deleteTest($uid);
            
            /** 
             * Retour vers la liste
             */
            return $this->liste();
        }
        
        public function edit($uid) {
            
            /** 
             * Instanciation du model
             */
            $tdb = new TestDBOrm();
            
            /**
             *Supression
             */

            $data['test'] = $tdb->getTest($uid);
            
            var_dump($tdb->getTest($uid));
            
            /** 
             * chargement de la vue edit.html
             */
            return $this->view->load("test/edit", $data);
        }`
         
        content += `
    }
    
?>`

        return content
    }

    generateModelContent() {
        let content = ''
        
        content += `<?php
    /*==================================================
        MODELE MVC DEVELOPPE PAR Ngor SECK
        ngorsecka@gmail.com
        (+221) 77 - 433 - 97 - 16
        PERFECTIONNEZ CE MODELE ET FAITES MOI UN RETOUR
        POUR TOUTE MODIFICATION VISANT A L'AMELIORER.
        VOUS ETES LIBRE DE TOUTE UTILISATION.
      ===================================================*/
    
    namespace src\\model;             
    use libs\\system\\Model;` 
              
        content += `    
    class ` + `${this.name}` + `DBOrm extends Model {
        /**
         * La base de données samane_test est dans src/view/test
         * Pour tester importer la 
         */
        
        public function __construct(){
            parent::__construct();
        }`
        
        content += `    

        public function get` + `${this.name}` + `($uid) {
            if($this->db != null)
            {
                return $this->db->getRepository('` + `${this.name}` + `')->find(array('uid' => $uid));

            }
            
            else
            {
                return null;
            }
        }`
                
        content += `    

        public function add` + `${this.name}` + `($test) {
            if($this->db != null)
            {
                $this->db->persist($test);
                $this->db->flush();

                return $test->getId();
                
            }
            
            else
            {
                return null;
            }
        }`
                
        content += `    

        public function delete` + `${this.name}` + `($uid) {

            if($this->db != null)
            {
                $test = $this->db->find('Test', $uid);
                if($test != null)
                {
                    $this->db->remove($test);
                    $this->db->flush();
                }else {
                    die("Objet ".$uid." n'existe pas!");
                }
                
            }

            else
            {
                return null;
            }
        }`
                
        content += `    

        public function update` + `${this.name}` + `($test) {

            if($this->db != null)
            {
                $getTest = $this->db->find('Test', $test->getId());
                if($getTest != null)
                {
                    $getTest->setValeur1($test->getValeur1());
                    $getTest->setValeur2($test->getValeur2());
                    $this->db->flush();

                }
                
                else 
                {
                    die("Objet ".$test->getId()." n'existe pas!");
                }
                
            }

            else
            {
                return null;
            }
        }`
                
        content += `   

        public function liste`+ `${this.name}` +`() {

            if($this->db != null)
            {
                return $this->db
                        ->createQuery("SELECT t FROM `+`${this.name}`+` t")
                        ->getResult();
                /**
                 * ou bien
                 * return $this->db->getRepository('`+`${this.name}`+`')->findAll();
                */
            }

            else
            {
                return null;
            }
        }

        `
        
        content += `    
        /*
            public function liste` + `${this.name}` + `sById($uid)
            {
                if($this->db != null)
                {
                    return $this->db->getRepository('` + `${this.name}` + `')->findBy(array('uid' => $uid));

                }

                else
                {
                    return null;
                }
            }

            //oubien 
            public function listeOf` + `${this.name}` + `sById($uid){
                
                if($this->db != null)
                {
                    return $this->db
                            ->createQuery("SELECT t FROM Test t WHERE t.id = " . $uid)
                            ->getResult();
                    //ou bien
                    //return $this->db->getRepository('` + `${this.name}` + `')->findAll();
                }

                else
                {
                    return null;
                }
            }

        */`

        content += `
    }
    
?>`

        return content
    }
}

module.exports = Generator