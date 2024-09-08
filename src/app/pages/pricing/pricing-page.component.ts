import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'This is the Pricing page',
    });
    this.meta.updateTag({
      property: 'og:title',
      content: 'Pricing Page',
    });

    this.meta.updateTag({
      property: 'keywords',
      content: 'Pricing, page',
    });
  }
}
