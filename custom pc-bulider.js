var cartBox = document.querySelector(".cart-box");

var popup = document.querySelector(".popup-processors");
var popupgpu = document.querySelector(".popup-gpus");
var popupMB = document.querySelector(".popup-motherboard");
var popupRam = document.querySelector(".popup-rams");

var processorButton = document.getElementById("CpuButton");
var GPUButton = document.getElementById("GPUButton");
var MBButton = document.getElementById("MbButton");
var RamButton = document.getElementById("RamButton");

var pro_close = document.getElementById("pro_close");
var gpu_close = document.getElementById("gpu_close");
var MotherBoard_close = document.getElementById("motherboard_close");
var Ram_close = document.getElementById("ram_close");

var cartElements = document.getElementById("cart_elements");
var cartTotal = document.getElementById("cart_total");
var listclearbutton = document.getElementById("listclearbutton");

var isProcessorAdded = false;
var isGpuAdded = false;
var isMotherBoardAdded = false;
var ramCount = 0;

var totalPrice = 0;

// Object to store selected components
var selectedComponents = {
    processor: null,
    gpu: null,
    motherboard: null,
    ram: [],
};

var processorData = {
    Intel_i9: { name: "Intel i9", price: 41637.0 },
    Intel_i7: { name: "Intel i7", price: 30400.0 },
    Intel_i5: { name: "Intel i5", price: 13699.0 },
    Intel_i3: { name: "Intel i3", price: 6399.0 },
    Ryzen_9: { name: "AMD Ryzen 9", price: 34936.0 },
    Ryzen_7: { name: "AMD Ryzen 7", price: 24169.0 },
    Ryzen_5: { name: "AMD Ryzen 5", price: 13619.0 },
    Ryzen_3: { name: "AMD Ryzen 3", price: 7199.0 },
};

var GpuData = {
    NGR3090: { name: "NVIDIA GeForce RTX 3090", price: 200000.0 },
    NGR3080: { name: "NVIDIA GeForce RTX 3080", price: 120000.0 },
    NGR3070: { name: "NVIDIA GeForce RTX 3070", price: 70000.0 },
    ARR6900XT: { name: "AMD Radeon RX 6900 XT", price: 120000.0 },
    NGTX1660Super: { name: "NVIDIA GeForce GTX 1660 Super", price: 25000.0 },
    AR5500XT: { name: "AMD Radeon RX 5500 XT", price: 20000.0 },
    NGTX1650Super: { name: "NVIDIA GeForce GTX 1650 Super", price: 18000.0 },
    ARRX570: { name: "AMD Radeon RX 570", price: 15000.0 },
};

var MotherBoardData = {
    GAS: { name: "Gigabyte GA-A320M-S2H", price: 9999.0 },
    BAE: { name: "Gigabyte B450 Aorus Elite", price: 9399.0 },
    AZPG: { name: "Asus Z170 Pro Gaming", price: 14146.0 },
    APZP: { name: "Asus Prime Z370-P", price: 9986.0 },
    ABSL: { name: "Asrock B450M Steel Legend", price: 8150.0 },
    AZP: { name: "Asrock Z370 Pro4", price: 11123.0 },
    MZAP: { name: "MSI Z390-A Pro", price: 15500.0 },
    MBPV: { name: "MSI B450M Pro-VDH", price: 6742.0 },
};

var RamData = {
    CC4DDCPR: {
        name: "Crucial CT4G4DFS824A 4GB DDR4 Dual Channel PC RAM",
        price: 846.0,
    },
    H4DDDCPR: { name: "Hynix 4GB DDR3 Dual Channel PC RAM", price: 450.0 },
    CVLPX16DDCPR: {
        name: "Corsair VENGEANCE LPX 16 GB DDR4 Dual Channel PC RAM",
        price: 4599.0,
    },
    KHF8DDCPR: { name: "Kingston HyperX FURY 8 GB DDR3 PC RAM", price: 2678.0 },
    KV8DDR31600: {
        name: "Kingston Value 8 GB DDR3 PC RAM (1600 MHz)",
        price: 2700.0,
    },
    GRV16DDCPR: {
        name: "G.Skill Ripjaws V Series 16GB DDR4 Dual Channel PC RAM",
        price: 5475.0,
    },
    CVRP32DDCPR: {
        name: "Corsair Vengeance RGB Pro 8GB DDR4 Dual Channel PC RAM",
        price: 2549.0,
    },
    CB32DDCPR: {
        name: "Crucial Ballistix 32GB(2x16) DDR4 Dual Channel PC RAM",
        price: 7230.0,
    },
};

document.addEventListener("DOMContentLoaded", () => {
    pro_close.onclick = () => {
        if (popup.style.display === "block") {
            popup.style.display = "none";
        }
    };
    gpu_close.onclick = () => {
        if (popupgpu.style.display === "block") {
            popupgpu.style.display = "none";
        }
    };
    MotherBoard_close.onclick = () => {
        if (popupMB.style.display === "block") {
            popupMB.style.display = "none";
        }
    };
    Ram_close.onclick = function () {
        if (popupRam.style.display === "block") {
            popupRam.style.display = "none";
        }
    };

    processorButton.onclick = function () {
        if (!isProcessorAdded) {
            popup.style.display = "block";
        } else {
            showNotification("You can select only 1 processor per build");
        }
    };
    GPUButton.onclick = function () {
        if (!isGpuAdded) {
            popupgpu.style.display = "block";
        } else {
            showNotification("You can select only 1 GPU per build");
        }
    };
    MBButton.onclick = function () {
        if (!isMotherBoardAdded) {
            popupMB.style.display = "block";
        } else {
            showNotification("You can add only 1 Motherboard");
        }
    };
    RamButton.onclick = function () {
        if (ramCount < 2) {
            popupRam.style.display = "block";
        } else {
            showNotification("You can select RAM up to 2 times");
        }
    };

    Object.keys(processorData).forEach((processorKey) => {
        var button = document.getElementById(processorKey + "_addButton");
        if (button) {
            button.onclick = () => {
                popup.style.display = "none";
                addToCart(processorData[processorKey].name, processorData[processorKey].price);
                selectedComponents.processor = processorData[processorKey];
                isProcessorAdded = true;
            };
        }
    });

    Object.keys(GpuData).forEach((gpukey) => {
        var button1 = document.getElementById(gpukey + "_addButton");
        if (button1) {
            button1.onclick = () => {
                addToCart(GpuData[gpukey].name, GpuData[gpukey].price);
                selectedComponents.gpu = GpuData[gpukey];
                isGpuAdded = true;
                popupgpu.style.display = "none";
            };
        }
    });

    Object.keys(MotherBoardData).forEach((MBkey) => {
        var button2 = document.getElementById(MBkey + "_addButton");
        if (button2) {
            button2.onclick = () => {
                addToCart(MotherBoardData[MBkey].name, MotherBoardData[MBkey].price);
                popupMB.style.display = "none";
                selectedComponents.motherboard = MotherBoardData[MBkey];
                isMotherBoardAdded = true;
            };
        }
    });

    Object.keys(RamData).forEach((RamKey) => {
        var button3 = document.getElementById(RamKey + "_addButton");
        if (button3) {
            button3.onclick = () => {
                if (ramCount < 2) {
                    addToCart(RamData[RamKey].name, RamData[RamKey].price);
                    selectedComponents.ram.push(RamData[RamKey]);
                    ramCount++;
                    popupRam.style.display = "none";
                } else {
                    showNotification("You can select up to 2 RAMs.");
                }
            };
        }
    });

    listclearbutton.onclick = () => {
        while (cartElements.firstChild) {
            cartElements.removeChild(cartElements.firstChild);
        }
        totalPrice = 0;
        cartTotal.innerText = totalPrice.toFixed(2);
        selectedComponents = {
            processor: null,
            gpu: null,
            motherboard: null,
            ram: [],
        };
        isProcessorAdded = false;
        isGpuAdded = false;
        isMotherBoardAdded = false;
        ramCount = 0;
    };

    document.getElementById("saveBuild").onclick = () => {
        saveBuild();
    };

    document.getElementById("notification-close").onclick = () => {
        document.getElementById("notification").style.display = "none";
    };
});

// Function to add items to the cart
function addToCart (itemName, price) {
    var cartItem = document.createElement("p");
    cartItem.innerText = itemName + " - ₹" + price.toFixed(2);
    cartElements.appendChild(cartItem);
    totalPrice += price;
    cartTotal.innerText = totalPrice.toFixed(2);
}

// Function to show notifications
function showNotification (message) {
    document.getElementById("notification").style.display = "block";
    document.getElementById("notification-text").innerText = message;
}

// Function to save the build
function saveBuild () {
    var buildData = JSON.stringify(selectedComponents);
    localStorage.setItem("customPCBuild", buildData);
    var shareLink = `${window.location.href}?build=${encodeURIComponent(buildData)}`;
    document.getElementById("shareLink").innerText = `Share your build: ${shareLink}`;
}