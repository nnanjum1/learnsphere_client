import "better-auth";

declare module "better-auth" {
    interface User {
        role: "student" | "instructor" | "admin";
    }

    interface UserAdditionalFields {
        role: "student" | "instructor" | "admin";
    }
}