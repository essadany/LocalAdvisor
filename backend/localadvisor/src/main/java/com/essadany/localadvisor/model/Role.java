package com.essadany.localadvisor.model;


public enum Role {

    USER, ADMIN;

    public String authority() {       /* authority() method is used to return the role name with the prefix ROLE_ */
        return "ROLE_" + this.name();
    }
}
