new Vue({
    el : '#app',
    data : {
        playerHealth : 100,
        monsterHealth : 100,
        isGameStarted : false,
        logs : [],
        attack_multiple : 15,
        special_attack_multiple : 25,
        monster_attack_multiple : 15,
        heal_up_multiple : 15,
        log_text : {
            attack : "Player Attack : ",
            specialAttack : "Special Attack : ",
            monsterAttack : "Monster Attack : ",
            healUp : "Heal Up : "
        }
    },
    methods : {
        startGame : function() {
            this.isGameStarted = true
        },
        attack : function() {
            var damage = Math.floor(Math.random() * this.attack_multiple)
            this.monsterHealth -= damage
            this.logs.push({turn : "player", text : this.log_text.attack + damage })
            this.monsterAttack()
        },
        specialAttack : function() {
            var damage = Math.floor(Math.random() * this.special_attack_multiple)
            this.monsterHealth -= damage
            this.logs.push({turn : "player", text : this.log_text.specialAttack + damage })
            this.monsterAttack()
        },
        monsterAttack : function() {
            var damage = Math.floor(Math.random() * this.monster_attack_multiple)
            this.playerHealth -= damage
            this.logs.push({turn : "monster", text : this.log_text.monsterAttack + damage })
        },
        healUp : function() {
            var heal = Math.floor(Math.random() * this.heal_up_multiple)
            this.playerHealth += heal
            this.logs.push({turn : "player", text : this.log_text.healUp + heal })
            this.monsterAttack()
        },
        giveUp : function() {
            this.playerHealth = 0
        },
    },
    watch : {
        playerHealth : function(value) {
            if (value <= 0) {
                this.playerHealth = 0
                if (confirm("You Lost The Game! Do You Want To Play Again? ")) {
                    this.playerHealth = 100
                    this.monsterHealth = 100
                    this.logs = []
                }
            }
            else if (value > 100) {
                this.playerHealth = 100
            }
        },
        monsterHealth : function(value) {
            if (value <= 0) {
                this.monsterHealth = 0
                if (confirm("You Win The Game! Do You Want To Play Again? ")) {
                    this.playerHealth = 100
                    this.monsterHealth = 100
                    this.logs = []
                }
            }
        }
    },
    computed : {
        playerProgress : function() {
            return {
                width : this.playerHealth + "%"
            }
        },
        monsterProgress : function() {
            return {
                width : this.monsterHealth + '%'
            }
        }
    }
})