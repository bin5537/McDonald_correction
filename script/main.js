// title 변경
let currentIndex = 0;
const titles = [
    "맥도날드",
    "McDonald's"
];

const changeTitle = () => {
    document.title = titles[currentIndex];
    currentIndex = (currentIndex + 1) % titles.length;
};

setInterval(() => {
    changeTitle();
}, 3000);

// header
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    const scrollTopBtn = document.querySelector("aside");

    if (window.scrollY > 100) {
        header.classList.add("scroll");
        scrollTopBtn.classList.add("show");
    } else {
        header.classList.remove("scroll");
        scrollTopBtn.classList.remove("show");
    }

    // 스크롤 위치
    const scrollerTop = document.querySelector("#scroller .topBar");
    const scrollerBottom = document.querySelector("#scroller .bottomBar");

    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    scrollerTop.style.height = scrollPercent + "%";
    scrollerBottom.style.height = (100 - scrollPercent) + "%";
});

// 검색창
const searchBtn = document.querySelector("header .inner>button");
const searchBox = document.querySelector("#mainSearch");

searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    searchBox.classList.add("show");
});

document.addEventListener("click", (e) => {
    if (!e.target.closest("#mainSearch")) {
        searchBox.classList.remove("show");
    }
});

const buttonTxt = document.querySelector("header .inner>button>span");
const normalTxt = buttonTxt.innerText;

searchBtn.addEventListener("mouseover", () => {
    buttonTxt.innerText = "클릭하면 검색창이 열립니다.";
});

searchBtn.addEventListener("mouseout", () => {
    buttonTxt.innerText = normalTxt;
});

const inputField = document.querySelector("#mainSearch>div:nth-of-type(1)>input");
const deleteSearch = document.querySelector("#deleteSearch");

deleteSearch.addEventListener("click", () => {
    inputField.value = "";
});

// 슬라이드
const swiperContainer = document.querySelector("#slide .inner");

const swiper = new Swiper(swiperContainer, {
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    }
});

// 상단으로 스크롤
const topHref = document.querySelector("#topHref");

topHref.addEventListener("click", () => {
    window.scrollTo({
        behavior: "smooth",
        top: 0
    });
});

// 스크롤 에니메이션
const eventBannerAni = new IntersectionObserver((e) => {
    e.forEach((box) => {
        const imgElement = box.target.querySelector("img");
        const divElement = box.target.querySelector("div");

        if (box.isIntersecting) {
            imgElement.style.opacity = 1;
            imgElement.style.marginLeft = 0;
            divElement.style.opacity = 1;
            divElement.style.marginRight = 0;
        } else {
            imgElement.style.opacity = 0;
            imgElement.style.marginLeft = "-150px";
            divElement.style.opacity = 0;
            divElement.style.marginRight = "-150px";
        }
    });
});

const eventBanner = document.querySelector("#eventBanner .inner");
eventBannerAni.observe(eventBanner);

const reviewAni = new IntersectionObserver((e) => {
    e.forEach((box) => {
        const reviewDiv = box.target.querySelector("div");

        if (box.isIntersecting) {
            reviewDiv.style.opacity = 1;
            reviewDiv.style.marginTop = 0;
        } else {
            reviewDiv.style.opacity = 0;
            reviewDiv.style.marginTop = "-150px";
        }
    });
});

const review = document.querySelector("#review .inner");
reviewAni.observe(review);

const adBanner = document.querySelector("#adBanner");
const adBannerArticle = gsap.utils.toArray("#adBanner>article");

gsap.to(adBannerArticle, {
    xPercent: -100 * (adBannerArticle.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: adBanner,
        start: "top top",
        end: () => "+=" + (adBanner.offsetWidth - innerWidth),
        pin: true,
        scrub: 1,
        snap: {
            snapTo: 1 / (adBannerArticle.length - 1),
            inertia: false,
            duration: {
                min: 0.1,
                max: 0.1
            },
        },
        invalidateOnRefresh: true,
        anticipatePin: 1
    }
});

// 웹페이지 로딩 후 2초 후 영상 로드
window.addEventListener("load", () => {
    const videos = document.querySelectorAll(".video");

    videos.forEach((video) => {
        const videoId = video.getAttribute("data-video-id");
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

        video.style.backgroundImage = `url(${thumbnailUrl})`;

        video.addEventListener("click", () => {
            openVideoPopup(videoId);
        });
    });
});

const openVideoPopup = (videoId) => {
    iframePopup = document.createElement("section");
    iframePopup.classList.add("iframePopup", "on");

    const closeButton = document.createElement("button");
    closeButton.textContent = "닫기";
    closeButton.addEventListener("click", ()=> {
        iframePopup.remove();
    });

    const innerDiv = document.createElement("div");
    innerDiv.classList.add("inner");

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    innerDiv.appendChild(iframe);
    iframePopup.appendChild(innerDiv);
    iframePopup.appendChild(closeButton);
    document.body.appendChild(iframePopup)
};