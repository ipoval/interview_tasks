/**
 * SHARING DATA WITH JAVASCRIPT - WEB NOTIFICATIONS
 * https://youtu.be/rIH2D59LWDE
 *
 * sharing data with JS to let JS know the state of the server objects
 * - can embed meta tag to let JS know if user is logged in
 * - can embed meta tag to send JS the special API tokens
 * - can embed tags with data attributes which contain JSON objects from database
 * - can be useful for any FE framework: React, Angular
 *
 * Server API:
 *   localhost:3000/notifications.json
 *   => [ { id: 1, actor: "username", action: "posted", "notifiable": { type: "forum_post" }, url: "/forums/1#post_9" } ]
 */

/*
 * Version without sharing data from server with javascript front-end
 */
class Notifications
  constructor: ->
    @notifications = $("[data-behaviour='notifications']")
    if @notifications.length > 0
      @handleSuccess(@notifications.data("notifications"))
      setInterval (-> @getNewNotifications() if @notifications.length > 0 ), 5000

  getNewNotifications: ->
    $("[data-behaviour='notifications-link']").on "click", @handleClick
    $.ajax(
      url: '/notifications.json'
      dataType: 'JSON'
      method: 'GET'
      success: @handleSuccess
    )

    handleClick: (e) =>
      $.ajax(
        url: '/notifications/mark_as_read'
        dataType: 'JSON'
        method: 'POST'
        success: -> $("[data-behavior='unread-count']").text('0')
      )

      handleSuccess: (data) =>
        items = $.map data, (notification) ->
          "<a class='dropdown-item' href='#{notification.url}'>#{notification.actor} #{notification.action} #{notification.notifiable.type}</a>"
        $("[data-behaviour='unread-count']").text(items.length)
        $("[data-behaviour='notification-items']").html(items)

jQuery -> new Notifications

<li data-behaviour="notifications" data-notifications='[{},{}]'></li>
<li data-behaviour="notifications" data-notifications='<%= render template: "notifications/index", formats: [:json] %>'></li>

class AcpplicationController < ActionController::Base
  before_action :set_notifications, if: :user_signed_in?

  private

  def set_notifications
    @notifications = Notifications.where(recipient: current_user).unread
  end
end
