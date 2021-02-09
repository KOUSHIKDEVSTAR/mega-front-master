export interface AccomodationmodelServer {
  accomodation_id : number;
  title: string;
  address: string;
  accomodation_price: string;
  post_short_content: string;
  accomodation_type_title: string;
  accomodation_type: string;
  
}

export interface ServerResponse {
  count: number;
  products: AccomodationmodelServer[];
}
