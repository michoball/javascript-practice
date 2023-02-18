export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {
      // IE 에서는 template 태크가 없어서 이를 거르기위한 if문
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      ); // constructor에서 가져온 modal-template template안에 있는 컨텐트를 가져오기
      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");
      // modal(스핀 로딩 효과) backdrop(어두운 뒷배경)을 가져오기
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      ); // modal의 스핀로딩효과 css가 담긴 template 가져오기
      this.modalElement.appendChild(contentElement); // modal div에 위에 가져온 template 붙이기
      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
      // body 안 가장 첫번째 child로 modal 과 backdrop를 추가하기
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement); // this.modalElement.remove();
      document.body.removeChild(this.backdropElement);
      // body에 추가했던 modal backdrop 노드 제거
      this.modalElement = null;
      this.backdropElement = null;
      // modal과 backdrop 초기화
    }
  }
}
