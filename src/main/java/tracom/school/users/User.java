package tracom.school.users;

public class User {
    private int id;
    private String name;
    private String email;
    private String role;

    public User(int id, String name, String email, String role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public void setId(int id){this.id = id;}
    public int getId(){return this.id;}

    public void setName(String name){this.name = name;}
    public String getName(){return this.name;}

    public void setEmail(String email){this.email = email;}
    public String getEmail(){return this.email;}

    public void setRole(String role){this.role = role;}
    public String getRole(){return this.role;}
}
