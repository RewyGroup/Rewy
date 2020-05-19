package se.rewy.site.models;

import javax.persistence.*;

@Entity
public class Notification {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String notificationText;

        @OneToOne
        private User user;

        private String type;


        public Notification() {}

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getNotificationText() {
                return notificationText;
        }

        public void setNotificationText(String notificationText) {
                this.notificationText = notificationText;
        }

        public User getUser() {
                return user;
        }

        public void setUser(User user) {
                this.user = user;
        }

        public String getType() {
                return type;
        }

        public void setType(String type) {
                this.type = type;
        }
}
