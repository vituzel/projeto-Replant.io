    const CARDS_PER_PAGE = 3;
    let currentPage = 0;
    let plants = [];
    let totalPages = 0;

    async function carregarPlantas() {
        const url = "http://localhost:3000/plants";

        try {
          const response = await fetch(url);
          const json = await response.json();

          plants = json.data.filter(p => p.image_url).slice(0,6).map(p => ({
            common_name: p.common_name || "Nome desconhecido",
            scientific_name: p.scientific_name || "Nome cientifício desconhecido",
            description: p.bibliography || "Sem descrição disponível",
            image: p.image_url
          }));

          totalPages = Math.ceil(plants.length / CARDS_PER_PAGE);
          renderCards();

        } catch(error) {
        console.error("Erro ao carregar dados das plantas", error)
      }
    }
    carregarPlantas();

      function renderCards() {
        const container = document.getElementById("plantsCarousel");
        container.innerHTML = "";

        const startIndex = currentPage * CARDS_PER_PAGE;
        const endIndex = startIndex + CARDS_PER_PAGE;

        const items = plants.slice(startIndex, endIndex);

        items.forEach((plant) => {
          const article = document.createElement("article");
          article.className = "w-[311px] h-[432px]";

          article.innerHTML = `
          <div
            class="h-full rounded-3xl shadow-lg flex flex-col p-2 card-float"
            style="background-color:#4E9B42;"
          >
            <div class="h-[190px] rounded-2xl overflow-hidden">
              <img src="${plant.image}" alt="${plant.common_name}"
                class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 mt-3 px-3 py-2 flex flex-col text-center">
              <h3 class="text-lg font-semibold mb-1 text-white">
                ${plant.common_name}
              </h3>
              <p class="text-xs font-semibold uppercase tracking-wide mb-3 text-black">
                ${plant.scientific_name}
              </p>
              <p class="text-sm leading-relaxed text-black">
                ${plant.description}
              </p>
            </div>
          </div>
        `;

          container.appendChild(article);
        });

        renderDots();
      }

      function renderDots() {
        const dotsContainer = document.getElementById("carouselDots");
        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        for (let i = 0; i < totalPages; i++) {
          const dot = document.createElement("button");
          dot.type = "button";

          dot.style.width = "24px";
          dot.style.height = "24px";
          dot.style.display = "flex";
          dot.style.alignItems = "center";
          dot.style.justifyContent = "center";
          dot.style.margin = "0 4px";
          dot.style.cursor = "pointer";
          dot.style.background = "transparent";
          dot.style.border = "none";

          const innerCircle = document.createElement("span");
          innerCircle.style.width = "12px";
          innerCircle.style.height = "12px";
          innerCircle.style.borderRadius = "9999px";
          innerCircle.style.display = "block";
          innerCircle.style.backgroundColor =
            i === currentPage ? "#34A853" : "#D1D5DB";

          dot.appendChild(innerCircle);

          dot.addEventListener("click", () => {
            currentPage = i;
            renderCards();
          });

          dotsContainer.appendChild(dot);
        }
      }

      function showPrev() {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        renderCards();
      }

      function showNext() {
        currentPage = (currentPage + 1) % totalPages;
        renderCards();
      }

      document.getElementById("prevButton").addEventListener("click", showPrev);
      document.getElementById("nextButton").addEventListener("click", showNext);