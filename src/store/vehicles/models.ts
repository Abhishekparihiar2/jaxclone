import { RentalNoteInterface, DeleteRentalNoteInterface, Vehicle, UpdateListInterface, UpdateNotesInListInterface, Notes, RentalInterface, UpdateRentalInListInterface, UpdateTasksInListInterface, VehicleTasks, SetVehicleListInterface, UpdateVehicleImagesInterface, UpdateVehiclePrimaryImagesInterface, UpdateVehicleTaskInterface, CompleteTaskInterface, AddVehicleDocumentInterface, DeleteVehicleDocInterface } from './interface';

export class EditNotes {
    type: string = "EDIT_NOTES";
    payload: RentalNoteInterface = {
        notes: "", 
        rentalId: 0, 
        userId: 0,
        author: "",
        vehicleId: 0,
        id: 0,
    } 
    constructor (data: RentalNoteInterface) {
        this.type = "EDIT_NOTES";
        if(data) {
            this.payload.notes = data.notes;
            this.payload.rentalId = data.rentalId;
            this.payload.userId = data.userId;
            this.payload.author = data.author;
            this.payload.id = data.id;
            this.payload.vehicleId = data.vehicleId
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class AddNotes {
    type: string = "ADD_NOTES";
    payload: RentalNoteInterface = {
        notes: "", 
        rentalId: 0, 
        vehicleId: 0,
        userId: 0,
        author: "",
        id: 0,
    } 
    constructor (data: RentalNoteInterface) {
        this.type = "ADD_NOTES";
        if(data) {
            this.payload.notes = data.notes;
            this.payload.rentalId = data.rentalId;
            this.payload.userId = data.userId;
            this.payload.author = data.author;
            this.payload.id = data.id;
            this.payload.vehicleId = data.vehicleId
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class DeleteNotes {
    type: string = "DELETE_NOTE";
    payload: DeleteRentalNoteInterface = {
        id: 0,
        rentalId: 0,
        vehicleId: 0,
    } 
    constructor (data: DeleteRentalNoteInterface) {
        this.type = "DELETE_NOTE";
        if(data) {
            this.payload.id = data.id;
            this.payload.rentalId = data.rentalId;
            this.payload.vehicleId = data.vehicleId;
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class DeleteVehicleDoc {
    type: string = "DELETE_VEHICLE_DOC";
    payload: DeleteVehicleDocInterface = {
        id: 0,
        vehicleId: 0,
    } 
    constructor (data: DeleteVehicleDocInterface) {
        this.type = "DELETE_VEHICLE_DOC";
        if(data) {
            this.payload.id = data.id;
            this.payload.vehicleId = data.vehicleId;
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateList {
    type: string = "UPDATE_LIST";
    payload: UpdateListInterface = {
        vehicle: null
    }
    constructor (data: Vehicle) {
        this.type = "UPDATE_LIST"
        if(data) {
            this.payload.vehicle = data
            if ( this?.payload?.vehicle?.images )
            {
                this.payload.vehicle.images = this.payload.vehicle.images.filter( ( img ) => img.id );
            }
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateNotesInList {
    type: string = "UPDATE_NOTES_LIST";
    payload: UpdateNotesInListInterface = {
        notes: null
    }
    constructor (data: Notes[], rentalId?: number, vehicleId?: number) {
        this.type = "UPDATE_NOTES_LIST"
        if(data) {
            this.payload.notes = data
            this.payload.rentalId = rentalId
            this.payload.vehicleId = vehicleId
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}


export class UpdateRentalList {
    type: string = "UPDATE_RENTAL_LIST";
    payload: UpdateRentalInListInterface = {
        rentals: null,
        vehicleId: null,
    }
    constructor (data: RentalInterface[], id: number) {
        this.type = "UPDATE_RENTAL_LIST"
        if(data) {
            this.payload.rentals = data
            this.payload.vehicleId = id
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateTaskInList {
    type: string = "UPDATE_TASK_LIST";
    payload: UpdateTasksInListInterface = {
        tasks: null,
        vehicleId: null,
    }
    constructor (data: VehicleTasks[], id: number) {
        this.type = "UPDATE_TASK_LIST"
        if(data) {
            this.payload.tasks = data
            this.payload.vehicleId = id
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class SetVehicleList {
    type: string = "SET_VEHICLES_LIST"
    payload: SetVehicleListInterface = {
        count: null,
        vehiclesList: null,
    }
    constructor (data: any) {
        let vehiclesList: Vehicle[] = [];
        this.type = "SET_VEHICLES_LIST"
        if(data) {
            data.data.forEach((item: Vehicle) => {
                vehiclesList.push(item);
            });
            this.payload.count = data.count
            this.payload.vehiclesList = vehiclesList
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateVehicleImages {
    type: string = "UPDATE_IMAGES";
    payload: UpdateVehicleImagesInterface = {
        vehicleId: null,
        images: null
    }
    constructor (data: any, vehicleId: number) {
        this.type = "UPDATE_IMAGES"
        if(data) {
            this.payload.vehicleId = vehicleId
            this.payload.images = data
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateVehiclePrimaryImages {
    type: string = "UPDATE_PRIMARY_IMAGES";
    payload: UpdateVehiclePrimaryImagesInterface = {
        vehicleId: null,
        url: null
    }
    constructor (data: any, vehicleId: number) {
        this.type = "UPDATE_PRIMARY_IMAGES"
        if(data) {
            this.payload.vehicleId = vehicleId
            this.payload.url = data
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateVehicleDocuments {
    type: string = "UPDATE_DOCUMENT";
    payload: UpdateVehiclePrimaryImagesInterface = {
        vehicleId: null,
        url: null
    }
    constructor (data: any, vehicleId: number) {
        this.type = "UPDATE_DOCUMENT"
        if(data) {
            this.payload.vehicleId = vehicleId
            this.payload.url = data
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class AddVehicleDocuments {
    type: string = "ADD_VEHICLE_DOCUMENT";
    payload: AddVehicleDocumentInterface = {
        vehicleId: null,
        urls: []
    }
    constructor (data: any, vehicleId: number) {
        this.type = "ADD_VEHICLE_DOCUMENT"
        if(data) {
            this.payload.vehicleId = vehicleId
            this.payload.urls = data
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class UpdateVehicleTask {
    type: string = "UPDATE_VEHICLE_TASK";
    payload: UpdateVehicleTaskInterface = {
        vehicleId: null,
        tasks: []
    }
    constructor (data: any, vehicleId: number) {
        this.type = "UPDATE_VEHICLE_TASK"
        if(data) {
            this.payload.vehicleId = vehicleId
            this.payload.tasks.push(data) 
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class VehicleTaskCompleted {
    type: string = "COMPLETE_VEHICLE_TASK";
    payload: CompleteTaskInterface = {
        vehicleId: null,
        taskId: null
    }
    constructor (taskId: number, vehicleId: number) {
        this.type = "COMPLETE_VEHICLE_TASK"
        this.payload.vehicleId = vehicleId
        this.payload.taskId = taskId
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

export class SetVehicleRegistrations {
    type: string = "SET_VEHICLES_REGISTRATIONS"
    payload: SetVehicleListInterface = {
        count: null,
        vehiclesList: null,
    }
    constructor (data: any) {
        let vehiclesList: Vehicle[] = [];
        this.type = "SET_VEHICLES_REGISTRATIONS"
        if(data) {
            data.data.forEach((item: Vehicle) => {
                vehiclesList.push(item);
            });
            this.payload.count = data.count
            this.payload.vehiclesList = vehiclesList
        }
    }
    action() {
        return {
            type: this.type,
            payload: this.payload
        }
    }
}

