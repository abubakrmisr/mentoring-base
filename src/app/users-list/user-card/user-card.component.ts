import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "../../intefaces/users.interface";

@Component({
    selector: "app-user-card",
    templateUrl: "./user-card.component.html",
    styleUrls: ["./user-card.component.scss"],
    standalone: true
})
export class UserCardComponent {
    @Input() 
    user!: User;
    
    @Output()
    deletUser = new EventEmitter<number>()
    
    onDeleteUser(userId: number) {
        this.deletUser.emit(userId)
    }
}