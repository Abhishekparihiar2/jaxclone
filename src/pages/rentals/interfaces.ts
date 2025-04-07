import { Rental } from "../../store/rentals/model";
import { RentalInterface } from "../../store/vehicles/interface";

export interface RentalInsuranceInterface {
  rental?: Rental;
  setEditDocuments?: (value: boolean) => void;
}
