const paymentsDiv = document.getElementById("payments");
const loadingDiv = document.getElementById("loading");

// Loading state
let loading = false;

async function getPaymentsFromBackend() {
  // Start the loader image
  loading = true;
  const response = await fetch("http://localhost:5000/payments");
  const data = await response.json();
  // console.log("response.json(): ", data);
  // We've got the data so stop the loader
  loading = false;

  return data;
}

async function addPaymentsToDom() {
  const payments = await getPaymentsFromBackend();
  console.log(payments);

  // Clear out loadingDiv HTML
  if (!loading) {
    loadingDiv.innerHTML = "";
  }

  // Loop through the payments and append a new child
  payments.forEach((payment) => {
    // Create a new Div element for each payment
    const div = document.createElement("div");
    // Add a 'payment' class for styling
    div.className = "payment";
    // Add the innerHTML to the div with payment data
    div.innerHTML = `
      <h3>${payment.title}</h3>
      <ul>
        <li><strong>Payment Date: </strong> ${payment.date}</li>
        <li><strong>Payment Description: </strong> ${payment.description}</li>
      </ul>
      <div class="tags">${payment.tags}</div>
    `;
    // Append this new div element to parent paymentsDiv
    paymentsDiv.appendChild(div);
  });
}

addPaymentsToDom();
