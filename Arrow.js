var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function Arrow(xvel, yvel) {
  this.index = arrows.length;
  this.x = player.x + player.width / 2;
  this.y = player.y + player.height / 2.3;
  this.xvel = xvel;
  this.yvel = yvel;
  this.doesitbounce = false;
  this.floor = player.y + player.height * 0.66;
  this.grav_constant = 0.3;
  this.bounce_constant = -0;
  this.total_vel = player.total_vel;
  this.tip_color = "rgb(0, 0, 0)";
  this.stuck_in_enemy = false;
  this.is_active = true;
  this.draw = function() {
    // c.beginPath();
    // c.fillStyle = "rgb(175, 124, 13)";
    // c.arc(arrows[i].x, arrows[i].y, 20, 0, 2 * Math.PI);
    // c.fill();
    // c.stroke();
    c.fillStyle = "rgb(140, 100, 13)";
    c.fillRect(this.x, this.y, unit, unit / 12);
    c.fillStyle = this.tip_color;
    c.fillRect(this.x + unit, this.y, unit / 12, unit / 12);
    c.fillRect(
      this.x + (unit * 13) / 12,
      this.y + unit / 48,
      unit / 12,
      unit / 24
    );
  };
  this.detect_collision = function() {
    console.log("arrows[i].xvel in Arrow = " + this.xvel)
    if (this.x > 920 || this.x < -50) {
      arrows.splice(i, 1);
      console.log("Arrow went to long");
    } else {
      for (m = 0; m < enemies.length; m++) {
        var e = enemies[m];

        if (this.is_active == true) {
          if (e.health == 0) {
            enemies.splice(m, 1);
          }
          // if (
          //   this.x + (unit * 7) / 6 >= e.x + unit &&
          //   this.x + (unit * 7) / 6 <= e.x + e.width &&
          //   this.y + unit / 12 >= e.y &&
          //   this.y + unit / 12 <= e.y + e.height / 4
          //   // e.health == 0
          // ) {
          //   console.log("arrow xvel set to 0")
          //   this.xvel = 0;
          //   this.yvel = 0;
          //   this.tip_color = "rgb(140, 50, 30)";
          //   this.is_active = false;
          //   this.doesitbounce = true;
          //   e.health = 0;
          //   // score++;
          // } else
          if (
            this.x + (unit * 7) / 6 >= e.x + unit &&
            this.x + (unit * 7) / 6 <= e.x + e.width &&
            this.y + unit / 12 >= e.y &&
            this.y + unit / 12 <= e.y + e.height
          ) {
            e.health -= 1;
            if (e.health == 0 || this.y + unit / 12 <= e.y + e.height / 4) {
              e.image = "fallen_enemy"
              e.xvel = 0
              this.doesitbounce = true;
              if (this.y + unit / 12 <= e.y + e.height / 4) {
                this.y += unit/3;
                this.x += unit/3;
              }
              for (i=0; i < arrows.length ; i++) {
                if (arrows[i].x + (unit * 7) / 6 >= e.x + unit &&
                arrows[i].x + (unit * 7) / 6 <= e.x + e.width &&
                arrows[i].y + unit / 12 >= e.y &&
                arrows[i].y + unit / 12 <= e.y + e.height) {
                    console.log("arrow xvel set to 0")
                    arrows[i].xvel = 0;
                    arrows[i].x += unit * 0.75;
                }
              }
              if (e.width == unit * 2) {
                score++;
              } else {
                score += 2;
              }
              setTimeout(() => {
                if (this.y < height/2) {
                  this.y += unit;
                }
              }, 4000);
            }
            else {
              e.xvel /= 2;
              this.xvel = e.xvel/2;
              this.stuck_in_enemy = true;
            }
            // if (this.stuck_in_enemy == false || e.health == 0) {
            //   this.xvel = 0;
            // }
            if (score % 20 == 0) {
              level += 1;
              spawn_rate += .001;
              console.log("spawn rate =" + spawn_rate)
            }
            this.grav_constant = 0;
            this.yvel = 0;
            this.tip_color = "rgb(140, 50, 30)";
            this.is_active = false;
          }
        }
      }
    }
  };
}
