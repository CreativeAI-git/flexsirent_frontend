import React from 'react';
import { useNavigate } from 'react-router';
import SubHeader from '../../shared/layout/SubHeader';
import PanelLayout from '../../shared/layout/PanelLayout';

const BlogDetails = () => {
    const navigate = useNavigate();

    return (
        <PanelLayout>
              <SubHeader label="Blog Details" />
           
            <div className="row">
                <div className="col-md-12">
                    <div className="">
                        <div className="ct_px_30_new pt-4 ct_white_bg">
                            <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                                <p className="mb-0 ct_text_op_05">Published on: 16 May 2025</p>
                                <p className="mb-0 ct_text_op_05">Tips and Insights</p>
                            </div>
                            <div className="mt-4">
                                <h4 className="ct_fs_18 ct_fw_600 mb-3">Find and List Rental Properties with Ease: Best Tools for Tenants and Homeowners</h4>
                                <p>Listing a rental property no longer calls for paying large fees to a real estate agent. Many websites now let homeowners post their rental homes for free, so they directly interact with possible renters. This innovative approach lets landlords save money and yet reach a broad audience by removing the need for intermediaries. List your rental property for free gives you total control over the lease process, from pricing to inquiry handling.</p>
                                <p>Listing a rental property no longer calls for paying large fees to a real estate agent. Many websites now let homeowners post their rental homes for free, so they directly interact with possible renters. This innovative approach lets landlords save money and yet reach a broad audience by removing the need for intermediaries. List your rental property for free gives you total control over the lease process, from pricing to inquiry handling.</p>
                                <div className="owl-carousel owl-theme ct_blog_dtl_slider my-4">
                                    <div className="item">
                                        <div className="ct_blog_img">
                                            <img  loading="lazy" src="assets/img/blog_img_1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="ct_blog_img">
                                            <img  loading="lazy" src="assets/img/blog_img_1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="ct_blog_img">
                                            <img  loading="lazy" src="assets/img/blog_img_1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="ct_blog_img">
                                            <img  loading="lazy" src="assets/img/blog_img_1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="ct_blog_img">
                                            <img  loading="lazy" src="assets/img/blog_img_1.png" alt="" />
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="ct_blog_img">
                                            <img  loading="lazy" src="assets/img/blog_img_1.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <h6 className="mb-2 ct_fs_18 ct_fw_600">Conclusion</h6>
                                <p>The procedure has always been simple, whether you are a renter wanting rental listings by the owner or a property owner wishing to post your rental for free. The rental market may be navigated more quickly with the correct instruments, hence preventing excessive costs and pointless delays. For both selling and searching for rental homes free from the inconvenience of intermediaries, websites like flexsirent.com are excellent starting points. Embracing the new wave of digital rental options can help to make the experience more economical, flexible, and enjoyable for all parties concerned.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PanelLayout>
    )
};

export default BlogDetails;