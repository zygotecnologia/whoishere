module Api
  class UsersController < ApplicationController
    #respond_to :json
    skip_before_action :verify_authenticity_token

    def index
      render json: User.order('last_seen DESC')
    end

    def create
      u = User.find_or_create_by(user_params)
      u.attributes = last_seen
      if u.save
        return render json: { status: "SUCESS", message: "Saved User" }, status: :ok
      end

      render json: { status: "FAIL", message: u.errors }, status: :unprocessable_entity
    end

    private

    def user_params
      params.permit(:mac)
    end

    def last_seen
      params.permit(:email, :mac, :last_seen)
    end
  end
end
